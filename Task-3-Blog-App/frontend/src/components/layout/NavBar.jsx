import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton component={RouterLink} to="/" edge="start" size="large"><MenuIcon /></IconButton>
          <Typography component={RouterLink} to="/" variant="h6" sx={{ fontWeight: 700 }}>
            Blogify
          </Typography>
        </Box>

        <Box>
          {user ? (
            <>
              <Button component={RouterLink} to="/create" variant="contained" sx={{ mr: 1 }}>Write</Button>
              <Button component={RouterLink} to="/profile" sx={{ mr: 1 }}>{user.name}</Button>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/login" sx={{ mr: 1 }}>Login</Button>
              <Button component={RouterLink} to="/register" variant="contained">Sign Up</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
