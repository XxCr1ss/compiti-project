/**
 * DashboardPage
 * 
 * This component represents the main dashboard page of the Compiti application.
 * 
 * Responsibilities:
 * - Display user information and a welcome message.
 * - Provide a logout button to end the user session.
 * - Serve as the landing page after successful authentication.
 * 
 * Layer:
 * Frontend – UI Component.
 * 
 * Scope:
 * This page is protected and only accessible to authenticated users. It will display
 * user-specific content in the future, such as spaces and notes.
 * 
 * Used In:
 * - AppRouter (as the main protected route)
 * 
 * Notes:
 * Currently, this page serves as a placeholder for future dashboard features. It demonstrates
 * how to access user information from the authentication context and handle logout functionality.
 */

import { useAuth } from '../context/AuthContext'
import { useRequireAuth } from '../hooks/useRequireAuth'

export const DashboardPage = () => {
  const { user, signOut } = useAuth()
  const { loading } = useRequireAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  /**
   * handleLogout
   * 
   * This function is called when the user clicks the "Cerrar Sesión" button. It calls the signOut
   * method from the authentication context to end the user session. If an error occurs during logout,
   * it logs the error to the console.
   * 
   * Responsibilities:
   * - Call the signOut function to log the user out.
   * - Handle any errors that may occur during the logout process.
   * 
   * @returns void
   */
  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Compiti</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <p className="text-gray-600">Bienvenido a Compiti, {user?.email}</p>
        <p className="text-sm text-gray-500 mt-2">
          Aquí irán tus espacios y notas próximamente.
        </p>
      </main>
    </div>
  )
}