import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GroupIcon from "@mui/icons-material/Group";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

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
        setFilteredEvents(data.data.events); // Set initially filtered events
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle Filters
  useEffect(() => {
    let filtered = [...events];

    if (locationFilter) {
      filtered = filtered.filter((event) => event.location === locationFilter);
    }

    if (dateFilter) {
      filtered = filtered.filter(
        (event) =>
          new Date(event.date).toISOString().split("T")[0] === dateFilter
      );
    }

    if (priceFilter) {
      if (priceFilter === "free") {
        filtered = filtered.filter((event) => event.price === "Free");
      } else if (priceFilter === "paid") {
        filtered = filtered.filter((event) => event.price !== "Free");
      }
    }

    setFilteredEvents(filtered);
  }, [locationFilter, dateFilter, priceFilter, events]);

  if (loading) return <CircularProgress color="primary" />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ margin: 4 }}>
        Events
      </Typography>
      <Grid container spacing={3}>
        {/* Filters Section */}
        <Grid item xs={12} md={3}>
          <Box sx={{ boxShadow: 3, padding: 2, borderRadius: 1 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Filter Events
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Location</InputLabel>
              <Select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <MenuItem value="">All Locations</MenuItem>
                {[...new Set(events.map((event) => event.location))].map(
                  (location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Date</InputLabel>
              <Select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <MenuItem value="">All Dates</MenuItem>
                {[...new Set(
                  events.map((event) =>
                    new Date(event.date).toISOString().split("T")[0]
                  )
                )].map((date) => (
                  <MenuItem key={date} value={date}>
                    {date}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Price</InputLabel>
              <Select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <MenuItem value="">All Prices</MenuItem>
                <MenuItem value="free">Free</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        {/* Events Section */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {filteredEvents.map((event) => (
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
                  <img
                    src={event.image_url}
                    alt={event.title}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderTopLeftRadius: "4px",
                      borderTopRightRadius: "4px",
                    }}
                  />
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
                      {event.price ? `${event.price}` : "Free"}
                    </Typography>
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      {event.description}
                    </Typography>
                  </CardContent>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                      margin: 1,
                      alignSelf: "center",
                      height: "48px",
                      width: "60%",
                      borderColor: "#1976d2",
                      color: "#1976d2",
                      "&:hover": {
                        borderColor: "#1565c0",
                        color: "#1565c0",
                      },
                    }}
                    component={Link}
                    to={`/events/${event.event_id}`}
                    startIcon={<VisibilityIcon />}
                  >
                    View Details
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventsPage;
