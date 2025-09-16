import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      parentId: { type: mongoose.Schema.Types.ObjectId, default: null },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

blogSchema.virtual("likesCount").get(function () {
  return this.likes ? this.likes.length : 0;
});

blogSchema.set("toJSON", { virtuals: true });
blogSchema.set("toObject", { virtuals: true });

export default mongoose.model("Blog", blogSchema);
