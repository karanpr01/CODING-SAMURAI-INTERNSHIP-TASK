import Blog from "../models/Blog.js";
import mongoose from "mongoose";

export const addComment = async (req, res) => {
  try {
    const { text, parentId } = req.body; // parentId optional for replies
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // comments stored as array of objects in blog document for simplicity
    // we will embed simple comments schema here
    if (!blog.comments) blog.comments = []; // dynamic field
    blog.comments.push({
      _id: new mongoose.Types.ObjectId(),
      user: req.user._id,
      text,
      parentId: parentId || null,
      createdAt: new Date()
    });

    await blog.save();
    res.status(201).json(blog.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("comments.user", "name");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog.comments || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
