/**
 * Main entry point for the Compiti API server.
 * 
 * Responsibilities:
 * - Initialize and configure the Express server.
 * - Set up middleware for CORS and JSON parsing.
 * - Register API routes (e.g., health check).
 * - Start the server and listen on the specified port.
 * 
 * Layer:
 * Backend – Server initialization and configuration.
 * 
 * Scope:
 * This file is responsible for bootstrapping the Express server and should be the main entry point for running the backend API. It should not contain business logic or route handlers, which should be organized in separate modules.
 * 
 * Used In:
 * - This file is executed when the server is started (e.g., using `npm start` or `node src/index.js`).
 * 
 * Notes:
 * - The server listens on the port defined in the environment variable PORT or defaults to 3000.
 * - CORS middleware is applied to allow cross-origin requests from the frontend application.
 * - The health check route is registered at /api/health to provide a simple endpoint for monitoring the API status.
 * - Additional routes and middleware can be added as needed, but should be organized in separate files for maintainability.
 * - Ensure that the server is properly secured and configured for production deployment, including handling environment variables and sensitive information appropriately.
 * - This file should be kept clean and focused on server initialization, with business logic and route handlers delegated to other modules.
 */

import express from 'express'
import dotenv from 'dotenv'
import { corsMiddleware } from './middlewares/cors.middleware'
import healthRoutes from './routes/health.routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(corsMiddleware)
app.use(express.json())

app.use('/api/health', healthRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})