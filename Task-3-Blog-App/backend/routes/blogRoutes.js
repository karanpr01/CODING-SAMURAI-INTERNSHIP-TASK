import express from "express";
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  toggleLike,
  addComment,
  deleteComment,
} from "../controllers/blogController.js";
import protect from "../Middleware/Authmiddleware.js";
import upload  from "../Middleware/uploadmiddleware.js"

const router = express.Router();

router.get("/", getBlogs);
router.post("/", protect, upload.single("image"), createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

// Toggle likes
router.post("/:id/like", protect, toggleLike);

// comments
router.post("/:id/comments", protect, addComment);
router.delete("/:id/comments/:commentId", protect, deleteComment);

export default router;