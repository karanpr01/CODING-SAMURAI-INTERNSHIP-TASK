// routes/blogRoutes.js
import express from "express";
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  toggleLike,
} from "../controllers/blogController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

// NEW: toggle like
router.post("/:id/like", protect, toggleLike);

export default router;
