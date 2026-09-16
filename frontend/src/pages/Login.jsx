import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthForm from '../components/auth/AuthForm'
import { useAuth } from '../hooks/useAuth'

const ROLE_HOME = { student: '/dashboard', instructor: '/instructor', admin: '/admin' }

export default function Login() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (form) => {
    await login(form)
    navigate(location.state?.from || ROLE_HOME[form.role] || '/dashboard', { replace: true })
  }

  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-12">
      <div className="card-surface w-full max-w-sm p-8">
        <span className="eyebrow">Welcome back</span>
        <h1 className="mt-2 font-display text-2xl font-bold">Log in to Eduzyra</h1>
        <p className="mt-1 text-sm text-slate-500">Continue your learning path.</p>

        <div className="mt-6">
          <AuthForm mode="login" onSubmit={handleSubmit} loading={loading} />
        </div>

        <p className="mt-4 text-center text-sm">
          <Link to="/forgot-password" className="font-semibold text-navy hover:text-navy-700">
            Forgot password?
          </Link>
        </p>

        <p className="mt-2 text-center text-sm text-slate-500">
          New here?{' '}
          <Link to="/signup" className="font-semibold text-navy hover:text-navy-700">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
