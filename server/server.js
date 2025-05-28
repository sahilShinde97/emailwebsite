import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhook } from './controllers/webhooks.js'

// initialize express

const app = express()

// connect to database
await connectDB()


// middleware
app.use(cors())

// routes
app.get('/', (req,res)=> res.send("API Working"))
app.post('/clerk', express.json(), clerkWebhook)

// port
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> 
    console.log(`server running on port ${PORT}`
        
    ))