import express from 'express'
import cors from 'cors'
import 'dotenv/config' // ✅ Must be first to load environment variables
import connectDB from './configs/mongodb.js'
import { clerkWebhook } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'

const app = express()

// connect to database
await connectDB()
connectCloudinary() // ✅ This is fine as-is, it's synchronous

// middleware
app.use(cors())
app.use(clerkMiddleware())

// routes
app.get('/', (req, res) => res.send("API Working"))
app.post('/clerk', express.json(), clerkWebhook)
app.use('/api/educator', express.json(), educatorRouter)

// port
const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`server running on port ${PORT}`)
)
