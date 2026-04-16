/**
 * NoteEditorPage
 *
 * This component provides a dedicated page for creating or editing a note.
 *
 * Responsibilities:
 * - Load existing note data for editing (if noteId is provided).
 * - Render the NoteEditor component.
 * - Handle save operations (create or update) including image upload.
 * - Navigate back to space detail after successful save.
 *
 * Layer:
 * Frontend – UI Component (Page/Container).
 *
 * Scope:
 * This is a protected route for creating new notes or editing existing ones.
 *
 * Used In:
 * - AppRouter (as a protected route with :spaceId and optional :noteId params)
 *
 * Notes:
 * Uses URL params to determine if creating a new note or editing an existing one.
 * Integrates with NotesContext for CRUD operations and handles image upload.
 */

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useNotes } from '../context/NotesContext'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { useAuth } from '../context/AuthContext'
import { NoteEditor } from '../components/NoteEditor'
import * as storageService from '../services/storage.service'
import type { Note, NoteFormData } from '../types/note.types'

export const NoteEditorPage = () => {
  const { spaceId, noteId } = useParams<{ spaceId: string; noteId?: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { createNote, updateNote, getNote } = useNotes()
  const { loading: authLoading } = useRequireAuth()

  const [note, setNote] = useState<Note | undefined>(undefined)
  const [loading, setLoading] = useState(!!noteId)

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

  const handleSave = async (data: NoteFormData) => {
    if (!spaceId || !user) return

    let imageUrl: string | undefined = note?.image_url || undefined

    // If exits a new image, use it
    if (data.image) {
      try {
        imageUrl = await storageService.uploadImage(data.image, user.id)
        
        // If we did edit and use a new image, use it and delete the other one
        if (note?.image_url && note.image_url !== imageUrl) {
          try {
            await storageService.deleteImage(note.image_url)
          } catch (err) {
            console.error('Error deleting old image:', err)
            // Continue if something fail
          }
        }
      } catch (err: any) {
        throw new Error('Error al subir la imagen: ' + err.message)
      }
    }

    if (noteId) {
      // Update note
      await updateNote(noteId, {
        title: data.title,
        content: data.content,
        image_url: imageUrl,
      })
    } else {
      // Create new note
      await createNote({
        space_id: spaceId,
        title: data.title,
        content: data.content,
        image_url: imageUrl,
      })
    }

    navigate(`/spaces/${spaceId}`)
  }

  const handleCancel = () => {
    navigate(`/spaces/${spaceId}`)
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  if (!spaceId) {
    navigate('/spaces')
    return null
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

        <NoteEditor initialData={note} onSave={handleSave} onCancel={handleCancel} spaceId={spaceId} />
      </div>
    </div>
  )
}