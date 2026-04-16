/**
 * NoteEditor Component
 *
 * This component provides a simple text editor for creating and editing notes.
 *
 * Responsibilities:
 * - Display a form with title, content, and image upload fields.
 * - Handle image upload and preview.
 * - Handle form submission for create or update operations.
 * - Show loading and error states.
 * - Provide save and cancel actions.
 *
 * Layer:
 * Frontend – UI Component (Form/Editor).
 *
 * Scope:
 * Used in NoteEditorPage for creating new notes or editing existing ones.
 *
 * Props:
 * - initialData: (Optional) Note data for editing
 * - onSave: Callback when form is submitted with valid data
 * - onCancel: Callback when cancel button is clicked
 * - spaceId: The ID of the space this note belongs to
 *
 * Notes:
 * This component manages its own form state but delegates the actual
 * create/update logic to the parent via the onSave callback.
 * Handles image preview and provides option to remove uploaded images.
 */

import { useState, useEffect, useRef } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import type { Note, NoteFormData } from '../types/note.types'

interface NoteEditorProps {
  initialData?: Note
  onSave: (data: NoteFormData) => Promise<void>
  onCancel: () => void
  spaceId: string
}

export const NoteEditor = ({ initialData, onSave, onCancel }: NoteEditorProps) => {
  const [formData, setFormData] = useState<NoteFormData>({
    title: '',
    content: '',
    image: null,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        content: initialData.content || '',
        image: null,
      })
      
      // Show image if exits
      if (initialData.image_url) {
        setImagePreview(initialData.image_url)
      }
    }
  }, [initialData])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    
    if (file) {
      // Validate the file type
      if (!file.type.startsWith('image/')) {
        setError('Por favor selecciona un archivo de imagen válido')
        return
      }

      // Validate size
      if (file.size > 5 * 1024 * 1024) {
        setError('La imagen no puede superar los 5MB')
        return
      }

      setFormData({ ...formData, image: file })
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setError('')
    }
  }

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: null })
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await onSave(formData)
    } catch (err: any) {
      setError(err.message || 'Error al guardar la nota')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">
        {initialData ? 'Editar Nota' : 'Nueva Nota'}
      </h2>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título *
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            maxLength={255}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Título de la nota"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Imagen
          </label>
          <input
            ref={fileInputRef}
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Máximo 5MB. Formatos: JPG, PNG, GIF, WebP</p>
        </div>

        {imagePreview && (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-full h-auto rounded-lg border border-gray-300"
              style={{ maxHeight: '400px' }}
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition"
            >
              Eliminar imagen
            </button>
          </div>
        )}

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Contenido
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={15}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="Escribe tu nota aquí..."
          />
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  )
}