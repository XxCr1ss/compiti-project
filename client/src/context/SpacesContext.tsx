/**
 * Spaces Context
 *
 * This context provides global state management for spaces across the application.
 *
 * Responsibilities:
 * - Maintain the list of spaces in memory.
 * - Provide functions to create, update, and delete spaces.
 * - Handle loading and error states.
 * - Fetch spaces when the component mounts.
 *
 * Layer:
 * Frontend – State Management (Context API).
 *
 * Scope:
 * This context should wrap components that need access to spaces data,
 * typically at a high level in the component tree (e.g., after authentication).
 *
 * Used In:
 * - App.tsx (wraps the authenticated portion of the app)
 * - SpacesPage, CreateSpaceModal, EditSpaceModal, etc.
 *
 * Notes:
 * This context relies on the SpacesService to interact with Supabase.
 * It does not fetch spaces automatically—consumers must call fetchSpaces() or
 * the component will fetch on mount if a user is authenticated.
 */

import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Space, CreateSpaceDTO, UpdateSpaceDTO } from '../types/space.types'
import * as spacesService from '../services/spaces.service'
import { useAuth } from './AuthContext'

interface SpacesContextType {
  spaces: Space[]
  loading: boolean
  error: string | null
  fetchSpaces: () => Promise<void>
  createSpace: (data: CreateSpaceDTO) => Promise<Space>
  updateSpace: (id: string, data: UpdateSpaceDTO) => Promise<Space>
  deleteSpace: (id: string) => Promise<void>
}

const SpacesContext = createContext<SpacesContextType | undefined>(undefined)

export const SpacesProvider = ({ children }: { children: ReactNode }) => {
  const [spaces, setSpaces] = useState<Space[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchSpaces = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const data = await spacesService.getSpaces()
      setSpaces(data)
    } catch (err: any) {
      setError(err.message || 'Error al cargar espacios')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createSpace = async (data: CreateSpaceDTO): Promise<Space> => {
    setError(null)

    try {
      const newSpace = await spacesService.createSpace(data)
      setSpaces((prev) => [newSpace, ...prev])
      return newSpace
    } catch (err: any) {
      setError(err.message || 'Error al crear espacio')
      throw err
    }
  }

  const updateSpace = async (id: string, data: UpdateSpaceDTO): Promise<Space> => {
    setError(null)

    try {
      const updatedSpace = await spacesService.updateSpace(id, data)
      setSpaces((prev) => prev.map((space) => (space.id === id ? updatedSpace : space)))
      return updatedSpace
    } catch (err: any) {
      setError(err.message || 'Error al actualizar espacio')
      throw err
    }
  }

  const deleteSpace = async (id: string): Promise<void> => {
    setError(null)

    try {
      await spacesService.deleteSpace(id)
      setSpaces((prev) => prev.filter((space) => space.id !== id))
    } catch (err: any) {
      setError(err.message || 'Error al eliminar espacio')
      throw err
    }
  }

  useEffect(() => {
    if (user) {
      fetchSpaces()
    } else {
      setSpaces([])
    }
  }, [user])

  const value = {
    spaces,
    loading,
    error,
    fetchSpaces,
    createSpace,
    updateSpace,
    deleteSpace,
  }

  return <SpacesContext.Provider value={value}>{children}</SpacesContext.Provider>
}

export const useSpaces = () => {
  const context = useContext(SpacesContext)
  if (context === undefined) {
    throw new Error('useSpaces debe usarse dentro de un SpacesProvider')
  }
  return context
}