import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from "react-router-dom";

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:4005/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
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

    if (loading) return <Typography variant="h6">Loading events...</Typography>;
    if (error) return <Typography variant="h6" color="error">Error: {error}</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Events
            </Typography>
            <Grid container spacing={2}>
                {events.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.event_id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{event.title}</Typography>
                                <Typography color="textSecondary">{event.location}</Typography>
                                <Typography variant="body2">{event.description}</Typography>
                                <Typography variant="body2">Date: {new Date(event.date).toLocaleDateString()}</Typography>
                                <Typography variant="body2">Price: {event.price}</Typography>
                                {event.capacity && (
                                    <Typography variant="body2">Capacity: {event.capacity}</Typography>
                                )}
                            </CardContent>
                            <button><Link to={`/events/${event.event_id}`}>View</Link></button>
                            </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default EventsPage;
