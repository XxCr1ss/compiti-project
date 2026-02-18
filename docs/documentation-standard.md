# Documentation Standard — Project: Compiti

## 1. Purpose

This document defines the official documentation standard for the Compiti project.

Objectives:

- Ensure consistency across the codebase.
- Improve maintainability and scalability.
- Facilitate onboarding of new developers.
- Enable future automated documentation generation.
- Clarify architectural intent beyond type definitions.

Applies to:

- Frontend (Vite + React + TypeScript)
- Backend (Node.js + Express + TypeScript)
- Configuration files when relevant

## 2. Adopted Standard

Compiti adopts **TSDoc** as the official documentation standard.

Why TSDoc:

- Provides a structured format for documenting TypeScript using block comments.
- Compatible with tools such as TypeDoc for API generation.
- Works well with Visual Studio Code for inline documentation.

All documentation must follow TSDoc syntax and structure.

## 3. General Principles

- Document intent, not trivial implementation details.
- Write documentation in English.
- Every exported element must be documented.
- Every file must begin with a file-level documentation block.
- Avoid redundant explanations of obvious TypeScript types.
- Describe system context when relevant.

## 4. File-Level Documentation (Mandatory)

Every file must begin with a block that explains:

- Purpose
- Responsibilities
- Architectural layer (if applicable)
- Where it is used
- Important dependencies (if relevant)

Example:

```ts
/**
 * SpaceService
 *
 * Purpose:
 * Handles business logic related to note spaces.
 *
 * Responsibilities:
 * - Create spaces
 * - Retrieve user spaces
 * - Delete spaces
 *
 * Layer:
 * Service layer (backend).
 *
 * Used In:
 * - SpaceController
 *
 * Dependencies:
 * - Supabase client
 */
```

## 5. Function Documentation

All exported functions must include:

- Clear description
- `@param` for each parameter
- `@returns` when applicable
- `@throws` when applicable
- `@example` when useful

Example:

```ts
/**
 * Creates a new note space for a given user.
 *
 * @param userId - Unique identifier of the user.
 * @param name - Name of the space.
 * @returns The created space entity.
 *
 * @throws Error if the database operation fails.
 *
 * @example
 * const space = await createSpace(userId, "Work Notes");
 */
export async function createSpace(userId: string, name: string) {
  // ...implementation
}
```

## 6. Class Documentation

Classes must describe:

- Overall purpose
- Responsibilities
- Architectural role
- Usage context

Example:

```ts
/**
 * SpaceController
 *
 * Purpose:
 * Handles HTTP requests related to spaces.
 *
 * Responsibilities:
 * - Validate request data
 * - Invoke service layer
 * - Send HTTP responses
 *
 * Layer:
 * Controller layer (backend).
 */
export class SpaceController {
  // ...implementation
}
```

## 7. Method Documentation

Public methods must be documented similarly to standalone functions.

```ts
/**
 * Retrieves all spaces associated with a user.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns HTTP response containing the list of spaces.
 */
async getSpaces(req: Request, res: Response) {
  // ...implementation
}
```

## 8. Interfaces and Types

Interfaces must explain the domain concept they represent.

```ts
/**
 * Represents a note space in the system.
 *
 * Used In:
 * - Service layer
 * - Controllers
 * - Frontend state
 */
export interface Space {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
}
```

## 9. React Component Documentation

All exported components must include:

- Purpose
- Props description
- Usage context

Example:

```tsx
/**
 * SpaceList Component
 *
 * Purpose:
 * Displays the list of note spaces for the authenticated user.
 *
 * Props:
 * - spaces: Array of Space entities.
 *
 * Used In:
 * - Dashboard page
 */
export function SpaceList({ spaces }: { spaces: Space[] }) {
  // ...implementation
}
```

## 10. Custom Hooks Documentation

Custom hooks must clearly describe their return structure.

```ts
/**
 * useSpaces
 *
 * Purpose:
 * Fetches and manages the authenticated user's spaces.
 *
 * @returns Object containing:
 * - spaces: Array of spaces
 * - loading: Loading state
 * - error: Error state
 */
export function useSpaces() {
  // ...implementation
}
```

## 11. Configuration Files

Configuration files that affect architecture or code quality must include a file-level description.

Example cases:

- ESLint configuration
- Environment configuration modules
- Supabase client initialization
- Middleware setup

## 12. Recommended TSDoc Tags

| Tag | Purpose |
|-----|---------|
| `@param` | Describe a parameter |
| `@returns` | Describe return value |
| `@throws` | Describe possible errors |
| `@example` | Provide usage example |
| `@remarks` | Additional contextual information |
| `@deprecated` | Mark deprecated elements |

## 13. When Documentation Is Not Required

Documentation is not mandatory for:

- Simple private helper functions with obvious behavior
- Local variables
- Trivial assignments
- Self-explanatory inline expressions

When in doubt, document intent.

## 14. Architectural Alignment

Documentation must reflect the architectural boundaries of Compiti:

- Controllers handle HTTP concerns.
- Services handle business logic.
- Data access logic must not leak into controllers.
- Frontend components must not embed backend logic.

Documentation should clarify these boundaries whenever relevant.

## 15. Enforcement

Code reviews must verify:

- Presence of file-level documentation.
- Proper documentation of exported elements.
- Clear explanation of intent.
- Absence of redundant or misleading comments.

## 16. Conclusion

Compiti formally adopts TSDoc as its documentation standard. This ensures:

- Structural clarity
- Long-term maintainability
- Professional-grade code organization
- Future compatibility with automated documentation tools

All contributors must adhere to this standard.