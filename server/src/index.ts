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