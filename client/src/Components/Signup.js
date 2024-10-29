import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Snackbar,
  Container,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Person, Email, Lock, Phone, Visibility, VisibilityOff } from "@mui/icons-material";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== rePassword) {
      setMessage("Passwords do not match!");
      setOpen(true);
      setLoading(false);
      return;
    }

    if (!/^\+1[0-9]{10}$/.test(mobile)) {
      setMessage("Please enter a valid Canadian mobile number starting with +1!");
      setOpen(true);
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address!");
      setOpen(true);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4005/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
              signup(
                fullName: "${fullName}",
                email: "${email}",
                password: "${password}",
                mobile: "${mobile}"
              ) {
                id
                fullName
                email
                mobile
              }
            }
          `,
        }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }


      setFullName("");
      setEmail("");
      setPassword("");
      setRePassword("");
      setMobile("");


      navigate("/login");

    } catch (error) {
      console.error("Error during signup:", error);
      setMessage("Signup failed. Please try again.");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url('https://wallpapers.com/images/hd/concert-background-t7rzcc096yvm7l7b.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              padding: "30px",
              background: "linear-gradient(to bottom right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.9))",
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{ marginBottom: 2, color: "rgb(1, 92, 166)" }}
            >
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ backgroundColor: "white", marginBottom: 2 }}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ backgroundColor: "white", marginBottom: 2 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"} 
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ backgroundColor: "white", marginBottom: 2 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Re-password"
                type="password" 
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ backgroundColor: "white", marginBottom: 2 }}
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Mobile No (Canada)"
                type="tel"
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ backgroundColor: "white", marginBottom: 2 }}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+1XXXXXXXXXX"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  padding: "10px",
                  marginTop: 2,
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "rgb(1, 92, 166)",
                  },
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Sign Up"}
              </Button>
            </form>
            <Box textAlign="center" color="red" sx={{ marginTop: 2 }}>
              <Typography variant="body2" align="center">
                Already have an account?{" "}
                <Link
                  href="/login"
                  sx={{
                    textDecoration: "underline",
                    color: "rgb(1, 92, 166)",
                    fontWeight: 'bold',
                    "&:hover": {
                      color: "rgb(0, 70, 130)",
                    },
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />

      <Box
        sx={{
          backgroundColor: "rgba(1, 92, 166, 0.9)",
          textAlign: "center",
          padding: "10px",
          marginTop: "auto",
        }}
      >
        <Typography variant="body2" sx={{ color: "white" }}>
          &copy; 2024 Explore KWC. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
