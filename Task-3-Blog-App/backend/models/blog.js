// models/Blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    content: { type: String, required: [true, "Content is required"] },
    tags: [String],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // array of user ids who liked
  },
  { timestamps: true }
);

// virtual property for likes count (optional convenience)
blogSchema.virtual("likesCount").get(function () {
  return this.likes ? this.likes.length : 0;
});

blogSchema.set("toJSON", { virtuals: true });
blogSchema.set("toObject", { virtuals: true });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;