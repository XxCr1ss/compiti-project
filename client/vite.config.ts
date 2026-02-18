/**
 * Vite configuration file
 * 
 * Purpose:
 * Configure Vite to work with React and Tailwind CSS for the client-side application.
 * 
 * Responsibilities:
 * - Enable React support via the official Vite React plugin.
 * - Enable Tailwind CSS integration.
 * - Export a typed configuration using defineConfig.
 * 
 * Layer:
 * Frontend tooling configuration.
 * 
 * Scope:
 * Applies only to the client-side application.
 * 
 * Used in:
 * - Development server (vite dev)
 * - Production build process (vite build)
 * 
 * Dependencies:
 * - @vitejs/plugin-react: Provides React support for Vite.
 * - @tailwindcss/vite: Provides Tailwind CSS support for Vite.
 * 
 * Notes:
 * This file is automatically detected by Vite.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
})
