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
 * This is the default Vite + React template component.
 * It should be replaced or extended when implementing actual
 * application features.
 */

import { AuthProvider } from './context/AuthContext'
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
   * Used only for demonstration purposes to illustrate
   * React state updates and re-rendering behavior.
   */

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
