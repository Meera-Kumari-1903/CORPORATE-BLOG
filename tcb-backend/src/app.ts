import { apiLimiter } from "./middleware/rateLimit.middleware.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api", apiLimiter);

// Root route (API health check)
app.get("/", (req, res) => {
  res.json({
    message: "Blog API is running 🚀",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

export default app;