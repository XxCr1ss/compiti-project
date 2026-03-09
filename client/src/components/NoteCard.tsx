/**
 * NoteCard Component
 *
 * This component displays a single note in a card format.
 *
 * Responsibilities:
 * - Display note title and preview of content.
 * - Provide click action to view/edit the note.
 * - Provide delete button.
 * - Show timestamp.
 *
 * Layer:
 * Frontend – UI Component (Presentational).
 *
 * Scope:
 * Used in the SpaceDetailPage to render each note in the list.
 *
 * Props:
 * - note: The note object to display
 * - onClick: Callback when card is clicked
 * - onDelete: Callback when delete button is clicked
 *
 * Notes:
 * This is a presentational component—it does not manage state or interact
 * with services directly. All actions are handled via callbacks.
 */

import type { Note } from '../types/note.types'

interface NoteCardProps {
  note: Note
  onClick: (note: Note) => void
  onDelete: (id: string) => void
}

export const NoteCard = ({ note, onClick, onDelete }: NoteCardProps) => {
  const contentPreview = note.content
    ? note.content.substring(0, 100) + (note.content.length > 100 ? '...' : '')
    : 'Sin contenido'

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(note.id)
  }

  return (
    <div
      onClick={() => onClick(note)}
      className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex-1">{note.title}</h3>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 text-sm font-medium ml-2"
        >
          Eliminar
        </button>
      </div>

      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{contentPreview}</p>

      <div className="text-xs text-gray-400">
        Actualizado: {new Date(note.updated_at).toLocaleDateString('es-ES')}
      </div>
    </div>
  )
}