// Mock feedback storage. Swap submitFeedback for a real API call once a
// backend endpoint exists — the shape of the payload can stay the same.

const NETWORK_DELAY_MS = 400

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), NETWORK_DELAY_MS))
}

// In-memory demo store. Also visible to the admin dashboard within a session.
const FEEDBACK_ENTRIES = []

export function submitFeedback({ name, email, role, courseId, rating, category, message }) {
  const entry = {
    id: `FB-${Date.now()}`,
    name,
    email,
    role,
    courseId: courseId || null,
    rating,
    category,
    message,
    submittedAt: new Date().toISOString(),
  }

  FEEDBACK_ENTRIES.unshift(entry)
  return delay(entry)
}

export function getAllFeedback() {
  return delay([...FEEDBACK_ENTRIES])
}
