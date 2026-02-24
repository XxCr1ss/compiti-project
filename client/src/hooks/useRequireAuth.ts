/**
 * useRequireAuth
 * 
 * This custom hook is responsible for enforcing authentication on protected routes in the Compiti application. 
 * It checks if the user is authenticated and redirects to the login page if not. 
 * It also provides the current user and loading state to components that use this hook.
 * 
 * Responsibilities:
 * - Check if the user is authenticated when a component mounts.
 * - Redirect unauthenticated users to the login page.
 * - Provide the current user and loading state to components that use this hook.
 * 
 * Layer:
 * Frontend – Custom Hook.
 * 
 * Scope:
 * This hook is used in protected components (e.g., DashboardPage) to ensure that only authenticated users can access those routes. 
 * It is essential for maintaining the security of the application by preventing unauthorized access to protected content.
 * 
 * Used In:
 * - DashboardPage (to protect the dashboard route)
 * 
 * Notes:
 * This hook relies on the useAuth hook to access authentication state and functions from the AuthContext. 
 * It uses the useNavigate hook from react-router-dom to handle redirection. 
 * The hook returns the current user and loading state, which can be used by components to conditionally render content based on authentication status.
 */

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const useRequireAuth = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  return { user, loading }
}