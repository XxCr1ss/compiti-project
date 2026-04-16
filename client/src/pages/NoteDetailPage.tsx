/**
 * NoteDetailPage
 *
 * This component displays the full details of a single note.
 *
 * Responsibilities:
 * - Display note title, image, and full content.
 * - Provide edit and delete buttons.
 * - Handle navigation back to space.
 *
 * Layer:
 * Frontend – UI Component (Page).
 *
 * Scope:
 * Read-only view of a note with options to edit or delete.
 *
 * Used In:
 * - AppRouter (optional route for viewing note details)
 *
 * Notes:
 * This is an alternative to directly opening the editor when clicking a note card.
 */

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useNotes } from '../context/NotesContext'
import { useRequireAuth } from '../hooks/useRequireAuth'
import type { Note } from '../types/note.types'

export const NoteDetailPage = () => {
  const { spaceId, noteId } = useParams<{ spaceId: string; noteId: string }>()
  const navigate = useNavigate()
  const { getNote, deleteNote } = useNotes()
  const { loading: authLoading } = useRequireAuth()

  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (noteId) {
      loadNote()
    }
  }, [noteId])

  const loadNote = async () => {
    if (!noteId) return

    setLoading(true)
    try {
      const data = await getNote(noteId)
      setNote(data)
    } catch (err) {
      console.error(err)
      navigate(`/spaces/${spaceId}`)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    navigate(`/spaces/${spaceId}/notes/${noteId}/edit`)
  }

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      return
    }

    if (!noteId) return

    try {
      await deleteNote(noteId)
      navigate(`/spaces/${spaceId}`)
    } catch (err) {
      console.error(err)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Nota no encontrada</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(`/spaces/${spaceId}`)}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Volver al espacio
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {note.image_url && (
            <div className="w-full">
              <img
                src={note.image_url}
                alt={note.title}
                className="w-full h-auto max-h-96 object-contain bg-gray-100"
              />
            </div>
          )}

          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold text-gray-800">{note.title}</h1>
              <div className="flex gap-3">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Editar
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-500 mb-6">
              Actualizado: {new Date(note.updated_at).toLocaleString('es-ES')}
            </div>

            {note.content && (
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-700">
                  {note.content}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}