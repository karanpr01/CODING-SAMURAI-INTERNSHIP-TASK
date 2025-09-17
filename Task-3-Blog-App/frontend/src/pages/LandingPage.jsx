import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import API from "../api/axiosClient";
import BlogCard from "../components/BlogCard";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/blogs");
        setFeatured(res.data.slice(0, 6));
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <Box sx={{ textAlign: "center", py: 6 }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 800 }}>Blogify</Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>Write, share and grow — for devs & creators.</Typography>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate("/register")}>Get Started</Button>
          <Button variant="outlined" onClick={() => navigate("/home")}>Explore</Button>
        </Box>
      </motion.div>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Featured posts</Typography>
        <Grid container spacing={2}>
          {featured.map((b) => (
            <Grid item xs={12} md={4} key={b._id}>
              <BlogCard blog={b} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Paper sx={{ mt: 6, p: 3 }}>
        <Typography variant="h6">Why Blogify?</Typography>
        <Typography color="text.secondary">AI suggestions, interactive posts, community groups, and a polished writing experience.</Typography>
      </Paper>
    </Box>
  );
}
