import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function AuthForm({ mode = 'login', onSubmit, loading }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' })
  const [errors, setErrors] = useState({})

  const isSignup = mode === 'signup'

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const nextErrors = {}
    if (isSignup && !form.name.trim()) nextErrors.name = 'Enter your full name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email'
    if (form.password.length < 6) nextErrors.password = 'Use at least 6 characters'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validate()) {
      onSubmit(form)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {isSignup && (
        <div>
          <label htmlFor="name" className="mb-1.5 block font-display text-sm font-medium">
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={handleChange('name')}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500"
            placeholder="Ananya Sharma"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
      )}

      <div>
        <label htmlFor="email" className="mb-1.5 block font-display text-sm font-medium">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500"
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block font-display text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={handleChange('password')}
          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500"
          placeholder="••••••••"
        />
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
      </div>

      {!isSignup && (
        <div>
          <label htmlFor="role" className="mb-1.5 block font-display text-xs font-medium text-slate-400">
            Demo login as (for reviewing role-based dashboards)
          </label>
          <select
            id="role"
            value={form.role}
            onChange={handleChange('role')}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-xs outline-none focus:border-teal-500"
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      )}

      <button type="submit" disabled={loading} className="btn-primary mt-2 w-full disabled:opacity-70">
        {loading && <Loader2 size={16} className="animate-spin" />}
        {isSignup ? 'Create account' : 'Log in'}
      </button>
    </form>
  )
}
