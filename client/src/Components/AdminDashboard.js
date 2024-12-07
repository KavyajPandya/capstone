import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  CardActions,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import logo from '../../public/assets/images/blue-logo-transepernt.png';


const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:4005/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                events {
                  event_id
                  title
                  location
                  description
                  date
                  price
                  capacity
                  image_url
                }
              }
            `,
          }),
        });

        const data = await response.json();
        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        setEvents(data.data.events);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  
  const handleDelete = async (eventId) => {
    try {
      const response = await fetch("http://localhost:4005/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation {
              deleteEvent(eventId: "${eventId}")
            }
          `,
        }),
      });

      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      setEvents(events.filter((event) => event.event_id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (loading) return <CircularProgress color="primary" />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <Box
      style={{
        width: "100%",
        backgroundColor: "rgb(1, 92, 166)",
        textAlign: "center",
        display: "flex",
        boxSizing: "border-box",
        justifyContent: "center",
        alignItems: "center",
      }}
      >
      <Typography variant="h4" gutterBottom align="center" sx={{ margin: 4, color:'white' }}>
        Admin Dashboard
      </Typography>
      </Box>
      
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/admin/events/new")}
        sx={{
          marginBottom: "20px",
          padding: "10px 20px",
          borderColor: "#1976d2",
          color: "#1976d2",
          "&:hover": {
            borderColor: "#1565c0",
            color: "#1565c0",
          },
        }}
        startIcon={<AddIcon />}
      >
        Add Event
      </Button>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.event_id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: 3,
                "&:hover": {
                  transform: "scale(1.02)",
                  transition: "transform 0.2s",
                  boxShadow: 6,
                },
              }}
            >
              {event.image_url && (
                <img
                src={event.image_url ? event.image_url : logo} 
                alt={event.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = logo; 
                }}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderTopLeftRadius: "4px",
                  borderTopRightRadius: "4px",
                  }}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {event.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#555" }}>
                  <EventIcon
                    sx={{
                      fontSize: "1rem",
                      verticalAlign: "middle",
                      marginRight: 0.5,
                    }}
                  />
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(new Date(event.date))}
                </Typography>

                <Typography variant="subtitle1" sx={{ color: "#555" }}>
                  <GroupIcon
                    sx={{
                      fontSize: "1rem",
                      verticalAlign: "middle",
                      marginRight: 0.5,
                    }}
                  />
                  {event.capacity ? event.capacity : "Unlimited"}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#555" }}>
                  <MonetizationOnIcon
                    sx={{
                      fontSize: "1rem",
                      verticalAlign: "middle",
                      marginRight: 0.5,
                    }}
                  />
                  {event.price ? `$${event.price}` : "Free"}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  {event.description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    marginRight: "10px",
                    marginBottom: "10px",
                    padding: "8px 15px",
                    borderColor: "#9c27b0",
                    color: "#9c27b0",
                    "&:hover": {
                      borderColor: "#7b1fa2",
                      color: "#7b1fa2",
                    },
                  }}
                  onClick={() =>
                    navigate(`/admin/events/edit/${event.event_id}`)
                  }
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    marginBottom: "10px",
                    padding: "8px 15px",
                    borderColor: "#f44336", 
                    color: "#f44336", 
                    "&:hover": {
                      borderColor: "#e53935", 
                      color: "#e53935", 
                    },
                  }}
                  onClick={() => handleDelete(event.event_id)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
