import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import API from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", { email, password });
      login(res.data);
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 480, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <form onSubmit={handle}>
        <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />
        <Button variant="contained" type="submit" fullWidth>Login</Button>
      </form>
      <Typography sx={{ mt: 2 }}>Don't have an account? <RouterLink to="/register">Sign up</RouterLink></Typography>
    </Box>
  );
}
