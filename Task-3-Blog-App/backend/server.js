import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

connectDB(process.env.MONGO_URI);

// mount routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => res.send("API running"));

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log("server is running on PORT:" + PORT));
}