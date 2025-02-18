import express from "express";
import connectDB from "./config/db";
import userRoutes  from "./routes/user.routes";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Home Page ");
});

app.use('/api/users', userRoutes);

// MongoDB connection
connectDB();
app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});
