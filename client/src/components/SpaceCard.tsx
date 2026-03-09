/**
 * SpaceCard Component
 *
 * This component displays a single space in a card format.
 *
 * Responsibilities:
 * - Display space title and description.
 * - Provide edit and delete buttons.
 * - Trigger edit and delete actions through callback props.
 *
 * Layer:
 * Frontend – UI Component (Presentational).
 *
 * Scope:
 * Used in the SpacesPage to render each space in the list.
 *
 * Props:
 * - space: The space object to display
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
  onEdit: (space: Space) => void
  onDelete: (id: string) => void
}

export const SpaceCard = ({ space, onEdit, onDelete }: SpaceCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{space.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(space)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(space.id)}
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