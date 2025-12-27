import { FormEvent, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import AuthCard from '../../components/auth/AuthCard'
import SocialButton from '../../components/auth/SocialButton'
import { tursoApiClient } from '../../lib/turso-api-client'

export default function LoginPage() {
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const initialEmail = params.get('email') || ''

  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await tursoApiClient.login(email, password)
      if (!res.user || res.error) {
        if (res.error === 'admin_must_use_admin_login') {
          throw new Error('Admin accounts must sign in using the Admin Login page.')
        }
        throw new Error(res.error || 'Failed to log in')
      }
      toast.success('Welcome back!')
    } catch (err: any) {
      toast.error(err?.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Illustration (hidden on small screens) */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 items-center justify-center">
        <img src="/Auth%20Background.png" alt="Authentication background" className="object-cover w-full h-full" />
      </div>

      {/* Sign-in form */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 bg-gray-50">
        <AuthCard>
        <div className="mb-8 text-center">
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">Log in</h1>
          <p className="mt-2 text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/auth/sign-up" className="font-medium text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="on" aria-busy={submitting}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={!!email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder="••••••••"
              autoComplete="current-password" aria-invalid={false}
            />
          </div>

          <div className="flex items-center justify-end text-sm">
            <a
              href="/auth/reset-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password? Send reset code
            </a>
          </div>

          <button
            type="submit"
            disabled={submitting || !email || !password}
            className="w-full rounded-xl bg-primary-600 text-white py-3 font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {submitting ? 'Signing in...' : 'Continue'}
          </button>
        </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4" aria-hidden="true">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-500 uppercase">or</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Social sign-in stubs */}
          <SocialButton provider="google" disabled={submitting} />
          <div className="h-3" />
          <SocialButton provider="github" disabled={submitting} />
        </AuthCard>
      </div>
    </div>
  )
}
