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


//middleware
//middleware
app.use(cors());
app.use(clerkMiddleware());

// For regular routes, use JSON parsing
app.use(express.json());

// Stripe webhook route must come after cors but before json parser
app.post('/stripe-webhook', express.raw({ type: 'application/json'}), stripeWebhooks);

//routes
app.get("/", (req, res) => res.send("API working"));
app.post('/clerk', clerkWebhooks);
app.use('/api/educator', educatorRouter);
app.use("/api/course", courseRouter);
app.use('/api/user', userRouter);
app.post('/stripe-webhook', express.raw({ type: 'application/json'}), stripeWebhooks)

// Add this before your routes
// Remove these lines as they're duplicates
app.use('/stripe-webhook', express.raw({type: 'application/json'}));
app.post('/stripe', express.raw({ type: 'application/json'}), stripeWebhooks)

// Keep only this one webhook route
app.post('/stripe-webhook', express.raw({ type: 'application/json'}), stripeWebhooks)


// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
