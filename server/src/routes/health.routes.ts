/**
 * Health check route for the Compiti API.
 * 
 * Purpose:
 * Provide a simple endpoint to verify that the API is running and responsive.
 * 
 * Responsibilities:
 * - Respond to GET requests at the root path ("/") with a JSON object indicating the API status.
 * 
 * Layer:
 * Backend – API route for health checks.
 * 
 * Scope:
 * This route is intended for monitoring and testing purposes. It can be used by tools like Postman, curl, or automated monitoring services to check the health of the API.
 * 
 * Used In:
 * - server/src/index.ts (where the route is registered with the Express app)
 * 
 * Notes:
 * - The response includes a status field (e.g., "ok") and a message confirming that the API is running correctly.
 * - This route does not require authentication and should be accessible to anyone who can reach the API.
 * - In a production environment, consider adding rate limiting or other protections to prevent abuse of this endpoint.
 * - Example response: { "status": "ok", "message": "Compiti API corriendo correctamente" }
 * - Example usage: GET http://localhost:3000/ (assuming the API is running on port 3000)
 * - This is a common practice in API development to have a dedicated health check endpoint for monitoring and diagnostics.
 * 
 * Security Notes:
 * - Since this endpoint is public, it should not expose any sensitive information about the API or its environment. It should only return a simple status message.
 */

import { Router, Request, Response } from 'express'

const router = Router()

/**
 * Health check endpoint.
 * 
 * @route GET /
 * 
 * @returns {Object} JSON object with API status and message.
 * 
 * @remarks
 * This endpoint is used to verify that the API is running and responsive. It should return a simple JSON response indicating the status of the API.
 */
router.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Compiti API corriendo correctamente' })
})

/**
 * Export the router to be used in the main server file (server/src/index.ts).
 * 
 * @remarks
 * This router should be registered with the Express app to make the health check endpoint available at the root path ("/").
 */
export default router