import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import API from "../api/axiosClient";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");

  useEffect(() => {
    if (editId) loadForEdit(editId);
    // eslint-disable-next-line
  }, [editId]);

  const loadForEdit = async (id) => {
    try {
      const res = await API.get(`/blogs/${id}`);
      setTitle(res.data.title);
      setContent(res.data.content);
      setTags((res.data.tags || []).join(", "));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = { title, content, tags: tags ? tags.split(",").map((t) => t.trim()) : [] };
      if (editId) {
        await API.put(`/blogs/${editId}`, payload);
      } else {
        await API.post("/blogs", payload);
      }
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error saving");
    } finally { setLoading(false); }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>{editId ? "Edit" : "Create"} Blog</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth label="Content" multiline minRows={8} value={content} onChange={(e) => setContent(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth label="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} sx={{ mb: 2 }} />
        <Button variant="contained" type="submit" disabled={loading}>{loading ? "Saving..." : editId ? "Save" : "Publish"}</Button>
      </form>
    </Box>
  );
}
