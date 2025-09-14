import express from 'express';
import Blog from '../models/blog.js';

const router = express.Router();

//  @dec create new blog
// @route Post /api/bolgs
router.post("/", async (req, res) => {
    try {
        const {title , content , author} = req.body;

        // Validate
        if(!title || !content || !author){
            return res.status(400).json({message: "All Fields are required"});
        }

        const newBlog = new Blog({title, content, author});
        const savedBlog = await newBlog.save();

        res.status(201).json(savedBlog);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// @desc Get all blogs
// @route Get /api/blogs

router.get("/", async(req,res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1});  //latest first

        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router