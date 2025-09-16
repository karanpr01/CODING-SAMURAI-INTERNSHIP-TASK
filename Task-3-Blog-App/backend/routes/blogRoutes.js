import express from "express";
import {
  createBlog, getBlogs, getBlogById, updateBlog, deleteBlog, toggleLike
} from "../controllers/blogController.js";
import { addComment, getComments } from "../controllers/commentController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

// likes
router.post("/:id/like", protect, toggleLike);

// comments
router.post("/:id/comments", protect, addComment);
router.get("/:id/comments", getComments);

export default router;
