import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    content: { type: String, required: [true, "Content is required"] },
    tags: [String],
    category: { type: String, required: false },
    image: { type: String }, // Cloudinary URL
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // array of user ids who liked
    comments:[commentSchema],
  },
  { timestamps: true }
);

// virtual property for likes count (optional convenience)
blogSchema.virtual("likesCount").get(function () {
  return this.likes ? this.likes.length : 0;
});

blogSchema.virtual("commentsCount").get(function () {
  return this.comments ? this.comments.length : 0;
});

blogSchema.set("toJSON", { virtuals: true });
blogSchema.set("toObject", { virtuals: true });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;