import Blog from "../models/blog.js";

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private
export const createBlog = async (req, res) => {
  try {
    const { title, content, tags, category } = req.body;

    const blog = new Blog({
      title,
      content,
      tags: tags ? tags.split(",") : [],
      category,
      author: req.user._id,
      image: req.file ? req.file.path : null, // Cloudinary URL
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res) => {
  try {
    const { category, tag, search } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (tag) {
      filter.tags = { $in: [tag] }; // check if tag exists in array
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    const blogs = await Blog.find(filter)
      .populate("author", "username email")
      .populate("comments.user", "username email")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // ensure logged-in user is blog owner
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.tags = req.body.tags || blog.tags;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Toggle like/unlike for a blog
// @route   POST /api/blogs/:id/like
// @access  Private
export const toggleLike = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // check if user already liked
    const alreadyLiked = blog.likes.some((id) => id.toString() === userId.toString());

    if (alreadyLiked) {
      // unlike: remove user id from likes array
      blog.likes = blog.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      // like: add user id to likes array
      blog.likes.push(userId);
    }

    const updatedBlog = await blog.save();

    // respond with likes count and whether user now likes it
    res.json({
      _id: updatedBlog._id,
      likesCount: updatedBlog.likes.length,
      likedByUser: !alreadyLiked,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// @desc    Add a comment to a blog
// @route   POST /api/blogs/:id/comments
// @access  Private
export const addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comment = {
      user: req.user._id,
      text: req.body.text,
    };

    blog.comments.push(comment);
    await blog.save();

    res.status(201).json({
      message: "Comment added",
      comments: blog.comments,
      commentsCount: blog.comments.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete a comment from a blog
// @route   DELETE /api/blogs/:id/comments/:commentId
// @access  Private
// Delete a comment from a blog (robust, doesn't use subdoc.remove())
export const deleteComment = async (req, res) => {
  try {
    const { id: blogId, commentId } = req.params;

    // 1) Find the blog
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // 2) Find the comment inside the blog.comments array
    const comment = blog.comments.find(
      (c) => c._id.toString() === commentId.toString()
    );
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // 3) Authorization: allow comment owner OR blog author
    const isCommentOwner = comment.user.toString() === req.user._id.toString();
    const isBlogOwner = blog.author.toString() === req.user._id.toString();
    if (!isCommentOwner && !isBlogOwner) {
      return res.status(403).json({ message: "Not authorized to delete comment" });
    }

    // 4) Remove the comment by filtering the array
    blog.comments = blog.comments.filter(
      (c) => c._id.toString() !== commentId.toString()
    );

    // 5) Save the blog document
    await blog.save();

    // 6) Respond with updated comments and count
    res.json({
      message: "Comment deleted",
      comments: blog.comments,
      commentsCount: blog.comments.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
