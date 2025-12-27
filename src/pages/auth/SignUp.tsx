import { FormEvent, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { tursoApiClient } from '../../lib/turso-api-client'

export default function RegisterPage() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const [firstName, setFirstName] = useState(params.get('firstName') || '')
  const [lastName, setLastName] = useState(params.get('lastName') || '')
  const [email, setEmail] = useState(params.get('email') || '')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const name = `${firstName} ${lastName}`.trim()
      const result = await tursoApiClient.register(email, password, name)
      if (!result.user || result.error) {
        throw new Error(result.error || 'Registration failed')
      }
      toast.success('Account created successfully!')
    } catch (err: any) {
      toast.error(err?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">Let&apos;s create your account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/auth/sign-in" className="font-medium text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Your first name"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Your last name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Create a password"
            />
          </div>

          <p className="text-xs text-gray-500">
            By signing up you agree to the terms and services and the privacy policy.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gray-900 text-white py-3 font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}


