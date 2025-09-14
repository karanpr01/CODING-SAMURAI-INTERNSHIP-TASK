import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js"

dotenv.config(); // load env

const app = express();

// Middleware
app.use(cors());  //allow forentend request
app.use(express.json());  // Parse Json body

// connect MongoDB
connectDB(process.env.MONOGO_URI);

//Test Route
app.get("/", (req,res) => {
    res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    
});

// Routes
app.use("/api/blogs", blogRoutes);