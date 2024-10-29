import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent } from '@mui/material';

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

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>{event.title}</Typography>
                    <Typography variant="h6" color="textSecondary">{event.location}</Typography>
                    <Typography variant="body1">{event.description}</Typography>
                    <Typography variant="body2">Date: {new Date(event.date).toLocaleDateString()}</Typography>
                    <Typography variant="body2">Price: {event.price}</Typography>
                    {event.capacity && <Typography variant="body2">Capacity: {event.capacity}</Typography>}
                </CardContent>
            </Card>
        </Container>
    );
};

export default EventDetailsPage;
