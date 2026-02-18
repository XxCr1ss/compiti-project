/**
 * Main Client Entry Point
 * 
 * Responsibilities:
 * - Initialize the React application by rendering the root component (App) into the DOM.
 * - Wrap the application in React's StrictMode for development checks.
 * 
 * Layer:
 * Frontend application entry point.
 * 
 * Scope:
 * Applies only to the client-side application.
 * 
 * Used in:
 * - Browser environment when the client application is loaded.
 * 
 * Dependencies:
 * - React: For building the UI components.
 * - ReactDOM: For rendering the React components into the DOM.
 * - App: The root component of the application.
 * - index.css: Global styles for the application.
 * 
 * Notes:
 * This file is typically referenced in the HTML template as the main script entry point.
 * It is responsible for bootstrapping the React application.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/**
 * Create and render the React application.
 * 
 * Responsibilities:
 * - Select the root DOM element (with id 'root').
 * - Render the App component wrapped in StrictMode for development checks.
 * 
 * @remarks
 * This is the standard way to initialize a React application using React 18's createRoot API.
 * 
 * @throws Error if the root DOM element is not found.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
