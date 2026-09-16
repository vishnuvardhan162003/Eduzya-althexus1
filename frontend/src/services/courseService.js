import { COURSES, getCourseById } from '../constants/courses'

// This service currently reads from static data (src/constants/courses.js).
// Replace the bodies below with real fetch() calls once an API is available —
// components already consume this service, not the constants file directly.

const NETWORK_DELAY_MS = 250

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), NETWORK_DELAY_MS))
}

export function fetchCourses({ category = 'All', query = '' } = {}) {
  let results = COURSES

  if (category && category !== 'All') {
    results = results.filter((course) => course.category === category)
  }

  if (query.trim()) {
    const normalized = query.trim().toLowerCase()
    results = results.filter(
      (course) =>
        course.title.toLowerCase().includes(normalized) ||
        course.instructor.toLowerCase().includes(normalized) ||
        course.category.toLowerCase().includes(normalized),
    )
  }

  return delay(results)
}

export function fetchCourseById(id) {
  return delay(getCourseById(id) ?? null)
}
