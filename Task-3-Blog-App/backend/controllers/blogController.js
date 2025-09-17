import Blog from "../models/Blog.js";

// create
export const createBlog = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const blog = await Blog.create({
      title, content, tags, author: req.user._id
    });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all with optional filters
export const getBlogs = async (req, res) => {
  try {
    const { tag, q } = req.query;
    const filter = {};
    if (tag) filter.tags = tag;
    if (q) filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { content: { $regex: q, $options: "i" } }
    ];
    const blogs = await Blog.find(filter).populate("author", "name email").sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get single
// get single with likes + comments count
export const getBlogById = async (req, res) => {
  try {
    // populate author details and optionally comments (if you have a Comment model with refs)
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email")
      .populate("comments.user", "name email"); // only if comments exist in schema

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({
      ...blog._doc,
      likesCount: blog.likes?.length || 0,
      commentsCount: blog.comments?.length || 0,
    });
  } catch (err) {
    // handle invalid ObjectId gracefully
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Invalid blog ID" });
    }
    res.status(500).json({ message: err.message });
  }
};


// update
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    if (blog.author.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });

    blog.title = req.body.title ?? blog.title;
    blog.content = req.body.content ?? blog.content;
    blog.tags = req.body.tags ?? blog.tags;

    const updated = await blog.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    if (blog.author.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });
    await blog.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// toggle like
export const toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });

    const userId = req.user._id.toString();
    const idx = blog.likes.findIndex((id) => id.toString() === userId);
    if (idx >= 0) {
      blog.likes.splice(idx, 1);
    } else {
      blog.likes.push(req.user._id);
    }
    const updated = await blog.save();
    res.json({ likesCount: updated.likes.length, likedByUser: idx < 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
