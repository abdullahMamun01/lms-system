import express from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import courseRoutes from "./routes/course.routes";
import moduleRoutes from "./routes/module.routes";
import lectureRoutes from "./routes/lecture.routes";


import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Home Page ");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/modules", moduleRoutes);
app.use("/api/v1/lectures", lectureRoutes);

// app.use("/api/v1/users", userRoutes);

// Error Handler
app.use(globalErrorHandler);
app.use(notFound);

connectDB();
app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
