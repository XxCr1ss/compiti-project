/**
 * SpaceModal Component
 *
 * This component renders a modal for creating or editing a space.
 *
 * Responsibilities:
 * - Display a form for space title and description.
 * - Handle form submission for create or update operations.
 * - Show loading and error states.
 * - Close modal on cancel or successful submission.
 *
 * Layer:
 * Frontend – UI Component (Modal/Form).
 *
 * Scope:
 * Used in SpacesPage when creating a new space or editing an existing one.
 *
 * Props:
 * - isOpen: Whether the modal is visible
 * - onClose: Callback to close the modal
 * - onSubmit: Callback when form is submitted with valid data
 * - initialData: (Optional) Space data for editing
 * - mode: 'create' | 'edit'
 *
 * Notes:
 * This component manages its own form state but delegates the actual
 * create/update logic to the parent via the onSubmit callback.
 */

import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import type { Space, SpaceFormData } from '../types/space.types'

interface SpaceModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: SpaceFormData) => Promise<void>
  initialData?: Space
  mode: 'create' | 'edit'
}

export const SpaceModal = ({ isOpen, onClose, onSubmit, initialData, mode }: SpaceModalProps) => {
  const [formData, setFormData] = useState<SpaceFormData>({
    title: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description || '',
      })
    } else {
      setFormData({ title: '', description: '' })
    }
    setError('')
  }, [initialData, isOpen])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await onSubmit(formData)
      onClose()
    } catch (err: any) {
      setError(err.message || 'Error al guardar el espacio')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">
          {mode === 'create' ? 'Crear Espacio' : 'Editar Espacio'}
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
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Guardando...' : mode === 'create' ? 'Crear' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}