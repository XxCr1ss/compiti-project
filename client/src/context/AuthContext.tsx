/**
 * AuthContext.tsx
 * 
 * Purpose:
 * Provides authentication context and related functionality for the Compiti frontend application.
 * 
 * Responsibilities:
 * - Manage user authentication state (logged in/out).
 * - Provide functions for signing up, signing in, and signing out.
 * - Handle Supabase authentication events and update the user state accordingly.
 * 
 * Layer:
 * Frontend – Context Provider.
 * 
 * Scope:
 * This context is used throughout the application to access authentication state and functions. 
 * It is essential for managing user sessions and protecting routes that require authentication.
 * 
 * Used In:
 * - App (wraps the entire application to provide auth context)
 * - LoginPage (to access signIn function)
 * - RegisterPage (to access signUp function)
 * - DashboardPage (to access user information and signOut function)
 * 
 * Notes:
 * This context uses the Supabase client to handle authentication. 
 * It listens for authentication state changes and updates the user state accordingly. 
 * The context provides a clean API for components to interact with authentication without needing to directly use the Supabase client.
 */

import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../services/supabase'
import type { AuthContextType } from '../types/auth.types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verify if there's an active session on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for authentication state changes (e.g., login, logout) and update user state accordingly
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}