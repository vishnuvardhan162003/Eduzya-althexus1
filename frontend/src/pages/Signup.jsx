import { Link, useNavigate } from 'react-router-dom'
import AuthForm from '../components/auth/AuthForm'
import { useAuth } from '../hooks/useAuth'

export default function Signup() {
  const { signup, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (form) => {
    await signup(form)
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-12">
      <div className="card-surface w-full max-w-sm p-8">
        <span className="eyebrow">Get started</span>
        <h1 className="mt-2 font-display text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-slate-500">Start a path in under two minutes.</p>

        <div className="mt-6">
          <AuthForm mode="signup" onSubmit={handleSubmit} loading={loading} />
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-navy hover:text-navy-700">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
