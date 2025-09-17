import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axiosClient";
import { Box, Typography, Button, TextField, Stack, Avatar } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function BlogDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchBlog(); /* eslint-disable-next-line */ }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/blogs/${id}`);
      setBlog(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const handleLike = async () => {
    if (!user) return alert("Login to like");
    try { await API.post(`/blogs/${id}/like`); fetchBlog(); } catch (err) { console.error(err); }
  };

  const handleAddComment = async () => {
    if (!user) return alert("Login to comment");
    if (!commentText.trim()) return;
    try {
      await API.post(`/blogs/${id}/comments`, { text: commentText });
      setCommentText("");
      fetchBlog();
    } catch (err) { console.error(err); }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 700 }}>{blog.title}</Typography>
      <Typography variant="subtitle2" color="text.secondary">By {blog.author?.name || "Unknown"} • {new Date(blog.createdAt).toLocaleString()}</Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>{blog.content}</Typography>
      </Box>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="outlined" onClick={handleLike}>👍 {blog.likes?.length || 0}</Button>
      </Stack>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Comments ({blog.comments?.length || 0})</Typography>
        {user ? (
          <Box sx={{ mt: 2 }}>
            <TextField fullWidth multiline minRows={2} value={commentText} onChange={(e) => setCommentText(e.target.value)} />
            <Button sx={{ mt: 1 }} onClick={handleAddComment}>Add Comment</Button>
          </Box>
        ) : <Typography sx={{ mt: 1 }}>Login to comment.</Typography>}

        <Box sx={{ mt: 2 }}>
          {blog.comments?.map((c) => (
            <Box key={c._id} sx={{ p: 1, border: "1px solid #eee", borderRadius: 1, mb: 1 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ width: 30, height: 30 }}>{c.user?.name?.[0] || "U"}</Avatar>
                <Box>
                  <Typography variant="subtitle2">{c.user?.name || "User"}</Typography>
                  <Typography variant="body2">{c.text}</Typography>
                  <Typography variant="caption" color="text.secondary">{new Date(c.createdAt).toLocaleString()}</Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
