/**
 * AppRouter
 *
 * This component defines all routes in the application.
 *
 * Responsibilities:
 * - Define public routes (login, register).
 * - Define protected routes (dashboard, spaces).
 * - Handle route protection and redirection based on authentication state.
 *
 * Layer:
 * Frontend – Routing.
 *
 * Scope:
 * This is the main router for the entire application.
 *
 * Used In:
 * - App.tsx
 *
 * Notes:
 * Uses react-router-dom for client-side routing.
 * ProtectedRoute and PublicRoute components handle authentication checks.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { DashboardPage } from '../pages/DashboardPage'
import { SpacesPage } from '../pages/SpacesPage'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  return user ? <>{children}</> : <Navigate to="/login" />
}

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  return user ? <Navigate to="/spaces" /> : <>{children}</>
}

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/spaces"
          element={
            <ProtectedRoute>
              <SpacesPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/spaces" />} />
        <Route path="*" element={<Navigate to="/spaces" />} />
      </Routes>
    </BrowserRouter>
  )
}