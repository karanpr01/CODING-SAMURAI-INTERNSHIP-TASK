// routes/blogRoutes.js
import express from "express";
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBlogs); // public
router.post("/", protect, createBlog); // only logged-in users
router.put("/:id", protect, updateBlog); // only blog owner
router.delete("/:id", protect, deleteBlog); // only blog owner

export default router;
