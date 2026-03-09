/**
 * Notes Context
 *
 * This context provides global state management for notes within a specific space.
 *
 * Responsibilities:
 * - Maintain the list of notes for the current space in memory.
 * - Provide functions to create, update, and delete notes.
 * - Handle loading and error states.
 * - Fetch notes when a space is selected.
 *
 * Layer:
 * Frontend – State Management (Context API).
 *
 * Scope:
 * This context should wrap components that need access to notes data,
 * typically within the space detail view.
 *
 * Used In:
 * - SpaceDetailPage and child components
 *
 * Notes:
 * This context relies on the NotesService to interact with Supabase.
 * Notes are loaded when setCurrentSpaceId is called with a valid space ID.
 */

import { createContext, useContext, useState, useRef, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { Note, CreateNoteDTO, UpdateNoteDTO } from '../types/note.types'
import * as notesService from '../services/notes.service'

interface NotesContextType {
  notes: Note[]
  currentSpaceId: string | null
  loading: boolean
  error: string | null
  setCurrentSpaceId: (spaceId: string | null) => void
  fetchNotes: (spaceId: string) => Promise<void>
  createNote: (data: CreateNoteDTO) => Promise<Note>
  updateNote: (id: string, data: UpdateNoteDTO) => Promise<Note>
  deleteNote: (id: string) => Promise<void>
  getNote: (id: string) => Promise<Note>
}

const NotesContext = createContext<NotesContextType | undefined>(undefined)

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([])
  const [currentSpaceId, setCurrentSpaceIdState] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Use a ref to track if a fetch operation is in progress to prevent duplicate calls
  const isFetchingRef = useRef(false)

  // useCallback for fetchNotes to ensure stable reference and prevent unnecessary re-renders
  const fetchNotes = useCallback(async (spaceId: string) => {
    // Do not fetch if already fetching notes for the current space
    if (isFetchingRef.current) {
      return
    }

    isFetchingRef.current = true
    setLoading(true)
    setError(null)

    try {
      const data = await notesService.getNotesBySpace(spaceId)
      setNotes(data)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar notas'
      setError(errorMessage)
      console.error('Error in fetchNotes:', err)

      // If the error is related to authentication or access, clear notes to prevent showing stale data
      if (errorMessage.includes('autenticado') || errorMessage.includes('acceso')) {
        setNotes([])
      }
    } finally {
      setLoading(false)
      isFetchingRef.current = false
    }
  }, [])

  const setCurrentSpaceId = useCallback(
    (spaceId: string | null) => {
      setCurrentSpaceIdState(spaceId)
      if (spaceId) {
        fetchNotes(spaceId)
      } else {
        setNotes([])
      }
    },
    [fetchNotes]
  )

  const createNote = useCallback(async (data: CreateNoteDTO): Promise<Note> => {
    setError(null)

    try {
      const newNote = await notesService.createNote(data)
      setNotes((prev) => [newNote, ...prev])
      return newNote
    } catch (err: any) {
      setError(err.message || 'Error al crear nota')
      throw err
    }
  }, [])

  const updateNote = useCallback(async (id: string, data: UpdateNoteDTO): Promise<Note> => {
    setError(null)

    try {
      const updatedNote = await notesService.updateNote(id, data)
      setNotes((prev) => prev.map((note) => (note.id === id ? updatedNote : note)))
      return updatedNote
    } catch (err: any) {
      setError(err.message || 'Error al actualizar nota')
      throw err
    }
  }, [])

  const deleteNote = useCallback(async (id: string): Promise<void> => {
    setError(null)

    try {
      await notesService.deleteNote(id)
      setNotes((prev) => prev.filter((note) => note.id !== id))
    } catch (err: any) {
      setError(err.message || 'Error al eliminar nota')
      throw err
    }
  }, [])

  const getNote = useCallback(async (id: string): Promise<Note> => {
    setError(null)

    try {
      return await notesService.getNoteById(id)
    } catch (err: any) {
      setError(err.message || 'Error al cargar nota')
      throw err
    }
  }, [])

  const value = useMemo(
    () => ({
      notes,
      currentSpaceId,
      loading,
      error,
      setCurrentSpaceId,
      fetchNotes,
      createNote,
      updateNote,
      deleteNote,
      getNote,
    }),
    [notes, currentSpaceId, loading, error, setCurrentSpaceId, fetchNotes, createNote, updateNote, deleteNote, getNote]
  )

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
}

export const useNotes = () => {
  const context = useContext(NotesContext)
  if (context === undefined) {
    throw new Error('useNotes debe usarse dentro de un NotesProvider')
  }
  return context
}