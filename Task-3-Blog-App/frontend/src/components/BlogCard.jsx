import React from "react";
import { Card, CardContent, CardMedia, Typography, Chip, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function BlogCard({ blog }) {
  const navigate = useNavigate();
  const excerpt = blog.content ? blog.content.slice(0, 160) + (blog.content.length > 160 ? "..." : "") : "";

  return (
    <motion.div whileHover={{ y: -6 }} style={{ cursor: "pointer" }}>
      <Card onClick={() => navigate(`/blog/${blog._id}`)} sx={{ mb: 2, borderRadius: 2 }}>
        {blog.image && <CardMedia component="img" height="180" image={blog.image} alt={blog.title} />}
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{blog.title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{excerpt}</Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            {(blog.tags || []).slice(0, 3).map((t) => <Chip key={t} label={t} size="small" />)}
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
}
