import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';

const EventDetailsPage = () => {
    const { event_id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch('http://localhost:4005/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                            query($id: Int!) {
                                event(event_id: $id) {
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
                        variables: { id: parseInt(event_id) },
                    }),
                });

                const data = await response.json();
                if (data.errors) {
                    throw new Error(data.errors[0].message);
                }

                setEvent(data.data.event);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [event_id]);

    if (loading) return <Typography variant="h6">Loading event details...</Typography>;
    if (error) return <Typography variant="h6" color="error">Error: {error}</Typography>;

    // Format the date for display if it exists
    const formattedDate = event?.date 
        ? new Date(event.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : "Date not available";

    return (
        <Container sx={{ marginTop: 4 }}>
            <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, padding: 2 }}>
                <img
                    src={event.image_url} 
                    alt={event.title}
                    style={{
                        width: '100%', 
                        maxWidth: '300px', 
                        height: '300px', 
                        objectFit: 'cover',
                        borderRadius: '4px',
                        marginRight: '16px',
                    }}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: 'left' }}>
                    <Typography variant="h4" gutterBottom>{event.title}</Typography>
                    <Typography variant="h6" color="textSecondary">{event.location}</Typography>
                    <Typography variant="body1" paragraph>{event.description}</Typography>
                    <Typography variant="body2">Date: {formattedDate}</Typography>
                    <Typography variant="body2">Price: {event.price}</Typography>
                    {event.capacity && <Typography variant="body2">Capacity: {event.capacity}</Typography>}
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ marginTop: 2 }}
                        onClick={() => window.history.back()}
                    >
                        Back to Events
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default EventDetailsPage;
