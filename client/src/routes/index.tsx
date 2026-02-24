/**
 * index.tsx
 * 
 * Purpose:
 * Defines the main routing structure of the Compiti frontend application.
 * This file defines the main routing structure of the application using React Router.
 * It includes protected routes that require authentication and public routes for login and registration.
 * The routing logic ensures that users are redirected appropriately based on their authentication status.
 * 
 * Responsibilities:
 * - Define the main routes for the application (login, register, dashboard).
 * - Implement route protection to ensure only authenticated users can access certain routes.
 * - Handle redirection for unauthenticated users trying to access protected routes.
 * - Provide a clean and organized routing structure for the application.
 * 
 * Layer:
 * Frontend – Routing Component.
 * 
 * Scope:
 * This file is responsible for managing the client-side routing of the application. 
 * It is used in the App component to render the appropriate pages based on the URL and authentication status of the user.
 * 
 * Used In:
 * - App (to render the routing structure of the application)
 * 
 * Notes:
 * This file uses React Router v6 for routing. 
 * It defines a ProtectedRoute component to guard routes that require authentication and a PublicRoute component to redirect authenticated users away from login/register pages. 
 * The routing structure includes a default route that redirects to the dashboard, and a catch-all route that also redirects to the dashboard for any undefined paths.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { DashboardPage } from '../pages/DashboardPage'
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

  return user ? <Navigate to="/dashboard" /> : <>{children}</>
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
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  )
}