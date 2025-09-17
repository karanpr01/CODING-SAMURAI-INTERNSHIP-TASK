import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

export default function Dashboard() {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    fetchMyPosts();
    // eslint-disable-next-line
  }, []);

  const fetchMyPosts = async () => {
    try {
      const res = await axiosClient.get("/api/blogs/my"); // assume backend route to get user's posts
      setMyPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>My Dashboard</Typography>
      <Button component={RouterLink} to="/create" variant="contained" sx={{ mb: 2 }}>Write New</Button>
      {myPosts.map((p) => (
        <Box key={p._id} sx={{ mb: 2, p: 2, border: "1px solid #eee", borderRadius: 1 }}>
          <Typography variant="h6">{p.title}</Typography>
          <Typography variant="body2">{p.content?.slice(0, 200)}...</Typography>
          <Box sx={{ mt: 1 }}>
            <Button component={RouterLink} to={`/blogs/${p._id}`} size="small">View</Button>
            <Button component={RouterLink} to={`/create?id=${p._id}`} size="small">Edit</Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
