import { createContext, useMemo, useState } from 'react'

export const AuthContext = createContext(null)

export const ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
}

// Registered users are persisted to localStorage so a name entered at signup
// survives logout/re-login (and page reloads) instead of being derived fresh
// from the email on every login.
const USERS_KEY = 'eduzyra_registered_users'

const loadRegisteredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || {}
  } catch {
    return {}
  }
}

const saveRegisteredUser = (email, profile) => {
  const users = loadRegisteredUsers()
  users[email.toLowerCase()] = profile
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  } catch {
    // ignore storage failures (e.g. private browsing quota)
  }
}

// Mock authentication + enrollment state, kept in memory for this session.
// Swap login/signup/logout for real API calls (services/authService.js) once
// a backend exists — every consumer reads from this context, not from here
// directly, so the rest of the app does not need to change.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([])

  const login = async ({ email, role = ROLES.STUDENT }) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 400))
    const existing = loadRegisteredUsers()[email.toLowerCase()]
    const nextUser = existing
      ? { ...existing, role: existing.role || role }
      : { name: email.split('@')[0] || 'Learner', email, role }
    setUser(nextUser)
    setLoading(false)
  }

  const signup = async ({ name, email, role = ROLES.STUDENT }) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 400))
    const nextUser = { name, email, role }
    saveRegisteredUser(email, nextUser)
    setUser(nextUser)
    setLoading(false)
  }

  const logout = () => {
    setUser(null)
    setEnrolledCourseIds([])
  }

  // Persists a profile edit (currently just the display name) both to the
  // in-memory user and to the registered-users store, so it survives
  // logout/re-login instead of reverting to whatever was typed at signup.
  const updateProfile = (updates) => {
    setUser((prev) => {
      if (!prev) return prev
      const nextUser = { ...prev, ...updates }
      saveRegisteredUser(nextUser.email, nextUser)
      return nextUser
    })
  }

  const enrollInCourse = (courseId) => {
    setEnrolledCourseIds((prev) => (prev.includes(courseId) ? prev : [...prev, courseId]))
  }

  const isEnrolledIn = (courseId) => enrolledCourseIds.includes(courseId)

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      signup,
      logout,
      updateProfile,
      isAuthenticated: Boolean(user),
      role: user?.role ?? null,
      enrolledCourseIds,
      enrollInCourse,
      isEnrolledIn,
    }),
    [user, loading, enrolledCourseIds, isEnrolledIn, updateProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
