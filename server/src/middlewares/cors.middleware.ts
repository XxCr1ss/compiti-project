/**
 * CORS middleware configuration for the Express server.
 * 
 * Purpose:
 * Configure Cross-Origin Resource Sharing (CORS) to allow the frontend application
 * to communicate with the backend API without being blocked by the browser's
 * same-origin policy.
 * 
 * Responsibilities:
 * - Define allowed origins, HTTP methods, and headers for cross-origin requests.
 * - Export a middleware function that can be used in the Express app.
 * 
 * Layer:
 * Backend – Middleware for handling cross-origin requests.
 * 
 * Scope:
 * This middleware should be applied to the Express app to enable CORS for all routes.
 * 
 * Used In:
 * - server/src/index.ts (main server file where the Express app is configured)
 * 
 * Notes:
 * - The allowed origin is set to the CLIENT_URL environment variable, which should
 *   point to the frontend application (e.g., http://localhost:5173).
 * - The middleware allows common HTTP methods and headers used in API requests.
 * - Ensure that the CLIENT_URL environment variable is correctly set in server/.env.
 * 
 * Security Notes:
 * - Be cautious when configuring CORS in production. Only allow trusted origins to prevent
 *   unauthorized access to your API.
 * - In development, it's common to allow localhost origins, but in production, you should
 *   restrict this to your actual frontend domain.
 */
import cors from 'cors'

export const corsMiddleware = cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})