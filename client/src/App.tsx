/**
 * App Component
 * 
 * Purpose:
 * Root component of the Compiti frontend application.
 *
 * Responsibilities:
 * - Render the initial UI structure.
 * - Demonstrate React state handling using useState.
 * - Serve as the entry point of the client-side component tree.
 *
 * Layer:
 * Frontend – Root UI component.
 *
 * Scope:
 * This component is mounted by main.tsx and represents the base of the
 * React component hierarchy.
 *
 * Used In:
 * - main.tsx (application bootstrap)
 *
 * Notes:
 * This component currently includes a simple counter example to demonstrate state management in React.
 * It also wraps the application in the AuthProvider to provide authentication context to all child components.
 * The AppRouter component is rendered within the AuthProvider to manage routing based on authentication state.
 */

import { AuthProvider } from './context/AuthContext'
import { SpacesProvider } from './context/SpacesContext'
import { AppRouter } from './routes'

/**
 * App
 * 
 * Main functioonal component of the application.
 * 
 * Responsibilities:
 * - Manage local UI state (count example).
 * - Render demonstration elements.
 * 
 * @returns JSX.Element representin the root UI of the application.
 * 
 * @example
 * Rendered automatically by ReactDOM in main.tsx:
 * 
 * ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
 */
function App() {
  /**
   * Local counter state.
   * 
   * This state is used to demonstrate React's useState hook for managing component state.
   */

  return (
    <AuthProvider>
      <SpacesProvider>
        <AppRouter />
      </SpacesProvider>
    </AuthProvider>
  )
}

export default App
