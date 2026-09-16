// Talks to the EduBot AI chatbot backend (FastAPI, runs separately on port 8000).
// Does not touch or depend on any existing Eduzyra service/backend.

import { getLocalBotReply } from '../utils/localBot'

const CHATBOT_API_URL = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:8000'

// How long to wait for the real backend before giving up and falling back to the
// local responder. The backend often isn't running at all in this environment, so
// this keeps the widget from sitting on "···" for a long time before recovering.
const REQUEST_TIMEOUT_MS = 6000

/**
 * Streams a canned local reply through the same onChunk contract the real backend
 * uses, so the UI doesn't need to know which source answered the question.
 */
async function streamLocalReply(message, onChunk) {
  const reply = getLocalBotReply(message)
  const words = reply.split(/(\s+)/)

  for (const word of words) {
    onChunk({ token: word })
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, 15))
  }

  onChunk({ done: true, mode: 'local' })
}

/**
 * Sends a chat message and streams the response token-by-token via SSE.
 * Falls back to a local, offline responder if the EduBot backend is unreachable,
 * misconfigured, or too slow to respond — so a question always gets an answer
 * instead of a bare connection error.
 * @param {string} message - The user's message
 * @param {string|null} conversationId - Existing conversation id, or null to start a new one
 * @param {(chunk: { token?: string, done?: boolean, mode?: string, sources?: any[], conversationId?: string }) => void} onChunk
 * @param {(error: Error) => void} onError
 */
export async function sendChatMessage(message, conversationId, onChunk, onError) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(`${CHATBOT_API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        conversation_id: conversationId ?? undefined,
      }),
      signal: controller.signal,
    })

    if (!response.ok || !response.body) {
      throw new Error(`Chatbot request failed (${response.status})`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let receivedAnything = false

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const events = buffer.split('\n\n')
      buffer = events.pop() ?? ''

      for (const rawEvent of events) {
        const dataLine = rawEvent
          .split('\n')
          .find((line) => line.startsWith('data:'))
        if (!dataLine) continue

        const jsonStr = dataLine.replace(/^data:\s*/, '')
        try {
          const parsed = JSON.parse(jsonStr)
          receivedAnything = true
          onChunk(parsed)
        } catch {
          // Ignore malformed SSE fragments
        }
      }
    }

    if (!receivedAnything) {
      // Backend responded but sent nothing usable — treat like an outage.
      await streamLocalReply(message, onChunk)
    }
  } catch {
    // Backend missing, unreachable, timed out, or errored — answer locally instead
    // of surfacing a raw connection error to the user.
    try {
      await streamLocalReply(message, onChunk)
    } catch (fallbackError) {
      if (onError instanceof Function) {
        onError(fallbackError)
      } else {
        console.error('Chatbot error:', fallbackError)
      }
    }
  } finally {
    clearTimeout(timeout)
  }
}

export function isChatbotConfigured() {
  return Boolean(CHATBOT_API_URL)
}
