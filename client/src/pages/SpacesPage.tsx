/**
 * SpacesPage
 *
 * This component displays the list of spaces for the authenticated user.
 *
 * Responsibilities:
 * - Display all spaces in a grid layout.
 * - Provide a button to create new spaces.
 * - Handle navigation to space detail.
 * - Handle edit and delete operations for spaces.
 * - Show loading, error, and empty states.
 *
 * Layer:
 * Frontend – UI Component (Page/Container).
 *
 * Scope:
 * This is a protected route accessible only to authenticated users.
 * It serves as the main interface for managing spaces.
 *
 * Used In:
 * - AppRouter (as a protected route)
 *
 * Notes:
 * This component uses the SpacesContext to access and manipulate space data.
 * It delegates rendering of individual spaces to the SpaceCard component.
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSpaces } from '../context/SpacesContext'
import { useRequireAuth } from '../hooks/useRequireAuth'
import { SpaceCard } from '../components/SpaceCard'
import { SpaceModal } from '../components/SpaceModal'
import type { Space, SpaceFormData } from '../types/space.types'

export const SpacesPage = () => {
  const navigate = useNavigate()
  const { spaces, loading, error, createSpace, updateSpace, deleteSpace } = useSpaces()
  const { loading: authLoading } = useRequireAuth()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [selectedSpace, setSelectedSpace] = useState<Space | undefined>(undefined)

  const handleCreateClick = () => {
    setModalMode('create')
    setSelectedSpace(undefined)
    setIsModalOpen(true)
  }

  const handleSpaceClick = (space: Space) => {
    navigate(`/spaces/${space.id}`)
  }

  const handleEditClick = (space: Space) => {
    setModalMode('edit')
    setSelectedSpace(space)
    setIsModalOpen(true)
  }

  const handleDeleteClick = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este espacio?')) {
      return
    }

    try {
      await deleteSpace(id)
    } catch (err) {
      console.error(err)
    }
  }

  const handleModalSubmit = async (data: SpaceFormData) => {
    if (modalMode === 'create') {
      await createSpace(data)
    } else if (selectedSpace) {
      await updateSpace(selectedSpace.id, data)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mis Espacios</h1>
          <button
            onClick={handleCreateClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            + Crear Espacio
          </button>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">{error}</div>}

        {spaces.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No tienes espacios todavía</p>
            <button
              onClick={handleCreateClick}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Crear tu primer espacio
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space) => (
              <SpaceCard
                key={space.id}
                space={space}
                onClick={handleSpaceClick}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}

        <SpaceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={selectedSpace}
          mode={modalMode}
        />
      </div>
    </div>
  )
}