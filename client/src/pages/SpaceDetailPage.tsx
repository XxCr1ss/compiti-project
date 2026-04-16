/**
 * SpaceDetailPage
 *
 * This component displays the details of a specific space and its notes.
 *
 * Responsibilities:
 * - Display space title and description.
 * - List all notes belonging to the space.
 * - Provide a button to create new notes.
 * - Handle navigation to note editor.
 * - Handle note deletion.
 *
 * Layer:
 * Frontend – UI Component (Page/Container).
 *
 * Scope:
 * This is a protected route accessible only to authenticated users.
 * It serves as the main interface for viewing and managing notes within a space.
 *
 * Used In:
 * - AppRouter (as a protected route with :spaceId param)
 *
 * Notes:
 * This component uses the NotesContext to access and manipulate note data.
 * It uses the SpacesContext to get space information.
 */

import { useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSpaces } from '../context/SpacesContext'
import { useNotes } from '../context/NotesContext'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { NoteCard } from '../components/NoteCard'
import type { Note } from '../types/note.types'

export const SpaceDetailPage = () => {
  const { spaceId } = useParams<{ spaceId: string }>()
  const navigate = useNavigate()
  const { spaces } = useSpaces()
  const { notes, loading, error, setCurrentSpaceId, deleteNote } = useNotes()
  const { loading: authLoading } = useRequireAuth()

  // Use useMemo to find the current space based on spaceId from URL params
  const space = useMemo(() => {
    return spaces.find((s) => s.id === spaceId)
  }, [spaces, spaceId])

  useEffect(() => {
    if (spaceId) {
      setCurrentSpaceId(spaceId)
    }

    // Cleanup function to reset current space ID when component unmounts or spaceId changes
    return () => {
      setCurrentSpaceId(null)
    }
  }, [spaceId, setCurrentSpaceId])

  const handleCreateNote = () => {
    navigate(`/spaces/${spaceId}/notes/new`)
  }

  const handleNoteClick = (note: Note) => {
    navigate(`/spaces/${spaceId}/notes/${note.id}/view`)
  }

  const handleDeleteNote = async (noteId: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      return
    }

    try {
      await deleteNote(noteId)
    } catch (err) {
      console.error(err)
    }
  }

  if (authLoading || !space) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/spaces')}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Volver a espacios
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{space.title}</h1>
          {space.description && <p className="text-gray-600">{space.description}</p>}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Notas</h2>
          <button
            onClick={handleCreateNote}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            + Nueva Nota
          </button>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">{error}</div>}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Cargando notas...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No hay notas en este espacio</p>
            <button
              onClick={handleCreateNote}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Crear tu primera nota
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={handleNoteClick}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}