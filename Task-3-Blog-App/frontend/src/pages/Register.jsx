import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import API from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/register", { name, email, password });
      login(res.data);
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 480, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>Sign Up</Typography>
      <form onSubmit={handle}>
        <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />
        <Button variant="contained" type="submit" fullWidth>Register</Button>
      </form>
      <Typography sx={{ mt: 2 }}>Already have an account? <RouterLink to="/login">Login</RouterLink></Typography>
    </Box>
  );
}
