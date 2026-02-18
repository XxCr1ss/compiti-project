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

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
