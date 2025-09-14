import express from "express";
import Blog from "../models/blog.js";

const router = express.Router();

// @desc Create new blog
// @route POST /api/blogs
router.post("/", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Validate
    if (!title || !content || !author) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = new Blog({ title, content, author });
    const savedBlog = await newBlog.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Get all blogs
// @route GET /api/blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // latest first
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Update a blog
// @route PUT /api/blogs/:id
router.put("/:id", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const { title, content, author } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update fields
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Delete a blog
// @route DELETE /api/blogs/:id
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc get single blog
// @route GET /api/blogs/:id

router.get("/:id", async (req,res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if(!blog){
      return res.status(404).json({ message: "Blog not found"});
    }

    res.json(blog);
    
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router;
