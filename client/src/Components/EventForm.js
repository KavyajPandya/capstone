import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Grid } from "@mui/material";

const EventForm = () => {
  const { event_id } = useParams(); 
  const [event, setEvent] = useState({
    title: "",
    location: "",
    description: "",
    date: "",
    price: "",
    capacity: "",
    image_url: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (event_id) {
      setIsEditMode(true);
      const fetchEvent = async () => {
        try {
          const response = await fetch("http://localhost:4005/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `query {
                event(event_id: ${event_id}) {
                  title
                  location
                  description
                  date
                  price
                  capacity
                  image_url
                }
              }`,
            }),
          });

          const data = await response.json();
          if (data.errors) {
            throw new Error(data.errors[0].message);
          }

          const fetchedEvent = data.data.event;
          const formattedDate = new Date(fetchedEvent.date).toISOString().split("T")[0];

          setEvent({
            ...fetchedEvent,
            date: formattedDate,
          });
        } catch (error) {
          console.error("Error fetching event:", error);
        }
      };

      fetchEvent();
    }
  }, [event_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mutation = isEditMode
        ? `mutation {
            updateEvent(
              event_id: ${event_id},
              title: "${event.title}",
              location: "${event.location}",
              description: "${event.description}",
              date: "${event.date}",
              price: "${event.price}",
              capacity: "${event.capacity}",
              image_url: "${event.image_url}"
            ) {
              event_id
            }
          }`
        : `mutation {
            addEvent(
              event_id: ${Math.floor(Math.random() * 1000)},
              title: "${event.title}",
              location: "${event.location}",
              description: "${event.description}",
              date: "${event.date}",
              price: "${event.price}",
              capacity: "${event.capacity}",
              image_url: "${event.image_url}"
            ) {
              event_id
            }
          }`;
  
      const response = await fetch("http://localhost:4005/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: mutation }),
      });
  
      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
  
      alert(isEditMode ? "Event updated successfully!" : "Event added successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };
  

  return (
    <Container sx={{ padding: "20px", marginTop: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        {isEditMode ? "Edit Event" : "Add Event"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>Title</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              label="Title"
              value={event.title}
              onChange={(e) => setEvent({ ...event, title: e.target.value })}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>Location</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              label="Location"
              value={event.location}
              onChange={(e) => setEvent({ ...event, location: e.target.value })}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>Description</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              label="Description"
              value={event.description}
              onChange={(e) => setEvent({ ...event, description: e.target.value })}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>Date</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              label="Date"
              type="date"
              value={event.date}
              onChange={(e) => setEvent({ ...event, date: e.target.value })}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>Price</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              label="Price"
              value={event.price}
              onChange={(e) => setEvent({ ...event, price: e.target.value })}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>Capacity</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              label="Capacity"
              value={event.capacity}
              onChange={(e) => setEvent({ ...event, capacity: e.target.value })}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>Image URL</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              label="Image URL"
              value={event.image_url}
              onChange={(e) => setEvent({ ...event, image_url: e.target.value })}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Button variant="contained" color="primary" type="submit" sx={{ padding: "10px 20px" }}>
              {isEditMode ? "Update Event" : "Add Event"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EventForm;
