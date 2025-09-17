import React, { useEffect, useState } from "react";
import API from "../api/axiosClient";
import BlogCard from "../components/BlogCard";
import { Box, TextField, Grid, CircularProgress, Chip } from "@mui/material";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/blogs");
      setBlogs(res.data);
      const allTags = Array.from(new Set(res.data.flatMap((b) => b.tags || [])));
      setTags(allTags);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = blogs.filter((b) => b.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <Box>
      <TextField fullWidth placeholder="Search titles..." value={q} onChange={(e) => setQ(e.target.value)} sx={{ mb: 2 }} />

      <Box sx={{ mb: 2 }}>
        {tags.map((t) => <Chip key={t} label={t} sx={{ mr: 1, mb: 1 }} onClick={() => setQ(t)} />)}
      </Box>

      {loading ? <CircularProgress /> : (
        <Grid container spacing={3}>
          {blogs.map((blog, idx) => (
            <Grid key={idx} size={{ xs: 12, md: 6, lg: 4 }}>
              <BlogCard blog={blog} />
            </Grid>
          ))}
        </Grid>

      )}
    </Box>
  );
}
