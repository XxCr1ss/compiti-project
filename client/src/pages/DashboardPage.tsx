/**
 * DashboardPage
 *
 * This component serves as a landing page after login.
 * Currently redirects to the Spaces page.
 *
 * Responsibilities:
 * - Redirect authenticated users to /spaces.
 *
 * Layer:
 * Frontend – UI Component (Page).
 *
 * Scope:
 * Protected route. May be expanded in the future to show analytics or overview.
 *
 * Used In:
 * - AppRouter
 *
 * Notes:
 * For now, this simply redirects to keep the routing structure flexible.
 */

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRequireAuth } from '../hooks/useRequireAuth'

export const DashboardPage = () => {
  const navigate = useNavigate()
  const { loading } = useRequireAuth()

  useEffect(() => {
    if (!loading) {
      navigate('/spaces')
    }
  }, [loading, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirigiendo...</p>
    </div>
  )
}