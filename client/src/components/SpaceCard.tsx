/**
 * SpaceCard Component
 *
 * This component displays a single space in a card format.
 *
 * Responsibilities:
 * - Display space title and description.
 * - Provide click action to navigate to space detail.
 * - Provide edit and delete buttons.
 *
 * Layer:
 * Frontend – UI Component (Presentational).
 *
 * Scope:
 * Used in the SpacesPage to render each space in the list.
 *
 * Props:
 * - space: The space object to display
 * - onClick: Callback when card is clicked
 * - onEdit: Callback when edit button is clicked
 * - onDelete: Callback when delete button is clicked
 *
 * Notes:
 * This is a presentational component—it does not manage state or interact
 * with services directly. All actions are handled via callbacks.
 */

import type { Space } from '../types/space.types'

interface SpaceCardProps {
  space: Space
  onClick: (space: Space) => void
  onEdit: (space: Space) => void
  onDelete: (id: string) => void
}

export const SpaceCard = ({ space, onClick, onEdit, onDelete }: SpaceCardProps) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit(space)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(space.id)
  }

  return (
    <div
      onClick={() => onClick(space)}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{space.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Eliminar
          </button>
        </div>
      </div>

      {space.description && <p className="text-gray-600 text-sm mb-3">{space.description}</p>}

      <div className="text-xs text-gray-400">
        Creado: {new Date(space.created_at).toLocaleDateString('es-ES')}
      </div>
    </div>
  )
}