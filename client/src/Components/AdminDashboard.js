import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Card, CardContent, Button, Typography } from "@mui/material";

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
  

  if (loading) return <Typography>Loading events...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/admin/events/new")}
        style={{ marginBottom: "20px" }}
      >
        Add Event
      </Button>
      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.event_id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{event.title}</Typography>
                <Typography color="textSecondary">{event.location}</Typography>
                <Typography variant="body2">{event.description}</Typography>
                <Typography variant="body2">
                  Date: {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">Price: {event.price}</Typography>
                <Typography variant="body2">Capacity: {event.capacity}</Typography>
              </CardContent>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate(`/admin/events/edit/${event.event_id}`)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDelete(event.event_id)}
              >
                Delete
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
