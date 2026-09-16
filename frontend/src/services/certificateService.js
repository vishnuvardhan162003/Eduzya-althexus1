// Mock certificate issuance + verification. Swap for real API calls once a
// backend generates and stores certificates. The ID format mirrors the spec:
// EDU-<year>-<sequence>.

const NETWORK_DELAY_MS = 300

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), NETWORK_DELAY_MS))
}

// In-memory demo store, keyed by certificate ID.
const ISSUED_CERTIFICATES = new Map()

export function issueCertificate({ studentName, courseTitle }) {
  const year = new Date().getFullYear()
  const sequence = String(ISSUED_CERTIFICATES.size + 1).padStart(5, '0')
  const id = `EDU-${year}-${sequence}`

  const certificate = {
    id,
    studentName,
    courseTitle,
    issuedOn: new Date().toISOString().slice(0, 10),
  }

  ISSUED_CERTIFICATES.set(id, certificate)
  return delay(certificate)
}

export function verifyCertificate(id) {
  return delay(ISSUED_CERTIFICATES.get(id.trim().toUpperCase()) ?? null)
}
