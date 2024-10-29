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
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccountCircle, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [mobile, setMobile] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    try {
      const response = await fetch("http://localhost:4005/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
              login(email: "${trimmedEmail}", password: "${trimmedPassword}") {
                message
                user {
                  id
                  fullName
                  email
                }
              }
            }
          `,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.errors) {
        setMessage(data.errors[0].message);
        setError(true);
      } else {
        setMessage(data.data.login.message);
        setError(false);
        navigate("/events");
      }
      setOpen(true);
    } catch (error) {
      setLoading(false);
      setMessage("Error: " + error.message);
      setError(true);
      setOpen(true);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !mobile) {
      setMessage("Please enter your email address and mobile number");
      setError(true);
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
              sendResetCode(email: "${email}", mobile: "${mobile}")
            }
          `,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.errors) {
        setMessage(data.errors[0].message);
        setError(true);
      } else {
        setMessage("OTP sent successfully! Check your mobile.");
        setError(false);
        setCodeSent(true);
      }
      setOpen(true);
    } catch (error) {
      setLoading(false);
      setMessage("Error: " + error.message);
      setError(true);
      setOpen(true);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setError(true);
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
              resetPassword(email: "${email}", newPassword: "${newPassword}") {
                message
              }
            }
          `,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.errors) {
        setMessage(data.errors[0].message);
        setError(true);
      } else {
        setMessage("Password reset successful!");
        setError(false);
        setOpen(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      setMessage("Error: " + error.message);
      setError(true);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url('https://streetline-film.com/wp-content/uploads/2018/10/events-background-1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ padding: "30px", background: "rgba(255, 255, 255, 0.9)", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)" }}>
            <Typography variant="h4" align="center" sx={{ marginBottom: 2, color: "rgb(1, 92, 166)" }}>
              Login
            </Typography>

            {!showForgotPassword ? (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Email"
                  type="email"
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{ backgroundColor: "white", marginBottom: 2 }}
                  InputProps={{
                    startAdornment: <AccountCircle sx={{ color: 'rgb(1, 92, 166)' }} />,
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{ backgroundColor: "white", marginBottom: 2 }}
                  InputProps={{
                    startAdornment: <Lock sx={{ color: 'rgb(1, 92, 166)' }} />,
                    endAdornment: (
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  {loading ? <CircularProgress size={24} /> : "Login"}
                </Button>
              </form>
            ) : (
              <Box sx={{ marginTop: 3, padding: 2, border: "1px solid rgb(1, 92, 166)", borderRadius: "8px", backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
                  Reset Password
                </Typography>
                <form onSubmit={codeSent ? handleResetPasswordSubmit : handleForgotPasswordSubmit}>
                  <TextField
                    label="Email"
                    type="email"
                    required
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    sx={{ backgroundColor: "white", marginBottom: 2 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    label="Mobile Number"
                    type="text"
                    required
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    sx={{ backgroundColor: "white", marginBottom: 2 }}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                  {codeSent && (
                    <>
                      <TextField
                        label="Verification Code"
                        type="text"
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        sx={{ backgroundColor: "white", marginBottom: 2 }}
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                      <TextField
                        label="New Password"
                        type={showNewPassword ? "text" : "password"}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        sx={{ backgroundColor: "white", marginBottom: 2 }}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                              {showNewPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          ),
                        }}
                      />
                      <TextField
                        label="Confirm New Password"
                        type="password"
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        sx={{ backgroundColor: "white", marginBottom: 2 }}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </>
                  )}
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
                    {loading ? <CircularProgress size={24} /> : "Submit"}
                  </Button>
                </form>
              </Box>
            )}

            <Box textAlign="center" sx={{ marginTop: 2 }}>
              <Button
                onClick={() => setShowForgotPassword(!showForgotPassword)}
                variant="outlined"
                color="primary"
                sx={{
                  color: "rgb(1, 92, 166)",
                  borderColor: "rgb(1, 92, 166)",
                  "&:hover": {
                    backgroundColor: "rgba(1, 92, 166, 0.1)",
                  },
                }}
              >
                {showForgotPassword ? "Back to Login" : "Forgot Password?"}
              </Button>
            </Box>
            <Box textAlign="center" sx={{ marginTop: 1 }}>
              <Typography variant="body2" component="span" sx={{ color: "red" }}>
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  sx={{
                    color: "rgb(1, 92, 166)",
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    "&:hover": {
                      color: "rgb(0, 70, 130)",
                    },
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box sx={{ backgroundColor: "rgba(1, 92, 166, 0.9)", textAlign: "center", padding: "10px", marginTop: "auto" }}>
        <Typography variant="body2" sx={{ color: "white" }}>
          &copy; 2024 Explore KWC. All rights reserved.
        </Typography>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        severity={error ? "error" : "success"}
      />
    </Box>
  );
}
