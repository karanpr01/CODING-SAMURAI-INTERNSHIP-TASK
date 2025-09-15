import Blog from "../models/Blog.js";

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private
export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      author: req.user._id, // attach logged-in user
    });

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
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