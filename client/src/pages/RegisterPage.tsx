/**
 * RegisterPage
 * 
 * This component provides a registration form for new users. It includes
 * fields for email, password, and password confirmation, along with validation
 * to ensure that the passwords match and meet minimum length requirements.
 * 
 * Responsibilities:
 * - Render a user-friendly registration form.
 * - Handle form submission and call the signUp function from the authentication context.
 * - Display error messages for validation issues or registration failures.
 * - Redirect users to the dashboard upon successful registration.
 * 
 * Layer:
 * Frontend – UI Component.
 * 
 * Scope:
 * This page is accessible to unauthenticated users. It serves as the entry point for new users to create an account and access the application's features.
 * 
 * Used In:
 * - AppRouter (as the main route for unauthenticated users)
 * 
 * Notes:
 * This component uses React state to manage form inputs and loading/error states. 
 * It also utilizes the useAuth hook to access authentication functions and state from the AuthContext. 
 * The form includes basic validation to ensure a better user experience.
 */

import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  /**
   * handleSubmit
   * 
   * This function is called when the user submits the registration form. 
   * It performs validation checks on the password fields to ensure they match and meet length requirements. 
   * If validation passes, it calls the signUp function from the authentication context to create a new user account. 
   * If registration is successful, it redirects the user to the dashboard. 
   * If any errors occur during registration, it sets an appropriate error message to be displayed to the user.
   * 
   * @param e FormEvent from the registration form submission. This event is used to prevent the default form submission behavior and to access form data for processing.
   * @returns void
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      await signUp(email, password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Error al registrarse')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Crear Cuenta</h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Cargando...' : 'Registrarse'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}