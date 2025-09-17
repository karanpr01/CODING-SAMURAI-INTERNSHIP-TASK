import React, { useEffect, useState } from "react";
import API from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    fetchMyPosts();
    // eslint-disable-next-line
  }, []);

  const fetchMyPosts = async () => {
    try {
      const res = await API.get("/blogs/my");
      setMyPosts(res.data);
    } catch (err) { console.error(err); }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Box>
      <Typography variant="h4">{user.name}</Typography>
      <Typography color="text.secondary">{user.email}</Typography>
      <Button component={RouterLink} to="/create" variant="contained" sx={{ mt: 2 }}>Write New</Button>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">My Posts</Typography>
        {myPosts.map((p) => (
          <Box key={p._id} sx={{ p: 2, border: "1px solid #eee", borderRadius: 1, mb: 2 }}>
            <Typography variant="subtitle1">{p.title}</Typography>
            <Typography variant="body2">{p.content?.slice(0, 180)}...</Typography>
            <Box sx={{ mt: 1 }}>
              <Button component={RouterLink} to={`/blog/${p._id}`} size="small">View</Button>
              <Button component={RouterLink} to={`/create?id=${p._id}`} size="small">Edit</Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
