import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js"

dotenv.config(); // load env

const app = express();

// Middleware
app.use(cors());  //allow forentend request
app.use(express.json());  // Parse Json body

// connect MongoDB
connectDB(process.env.MONGO_URI);

//Test Route
app.get("/", (req,res) => {
    res.send("API is running...");
});

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes)

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    
});
