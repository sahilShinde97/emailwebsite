import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks, stripeWebhooks  } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";
import courseRouter from "./routes/courseRoute.js";
import userRouter from "./routes/userRoutes.js";

// initialize express
const app = express();

//Connect to Database
await connectDB();
await connectCloudinary();

// Basic middleware
app.use(cors());
app.use(clerkMiddleware());

// Stripe webhook route with raw body parser
app.post('/stripe-webhook', express.raw({ type: '*/*' }), stripeWebhooks);

// For all other routes, use JSON parsing
app.use(express.json());

//routes
app.get("/", (req, res) => res.send("API working"));
app.post('/clerk', clerkWebhooks);
app.use('/api/educator', educatorRouter);
app.use("/api/course", courseRouter);
app.use('/api/user', userRouter);

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
