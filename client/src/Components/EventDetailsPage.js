import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';

const EventDetailsPage = () => {
    const { event_id } = useParams();
    const navigate = useNavigate(); 
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

    const formattedDate = event?.date 
        ? new Date(event.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : "Date not available";

    const handleBookEvent = () => {
        // if (event.capacity === '0') {
        //     alert("This event is full!");
        //     return;
        // }
        const user = localStorage.getItem("user"); 
        if (!user) {
            alert('Please login to book this event.');
            navigate('/login'); 
            return;
        }

        if (event.price != 'Free') {
            navigate(`/paypal-payment/${event.event_id}`);
        } else {
            navigate(`/checkout/${event.event_id}`, { state: { event } });            
        }
        // Redirect to CheckoutPage and pass event details
        //navigate(`/checkout/${event.event_id}`, { state: { event } });
    };

    return (
        <Container sx={{ marginTop: 4 }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
                <img
                    src={event.image_url} 
                    alt={event.title}
                    style={{
                        width: '100%', 
                        maxHeight: '300px',
                        height: 'auto', 
                        objectFit: 'cover', 
                        borderRadius: '4px 4px 0 0',
                    }}
                />
                <CardContent sx={{ textAlign: 'left', paddingTop: 2 }}>
                    <Typography variant="h4" gutterBottom>{event.title}</Typography>
                    <Typography variant="h6" color="textSecondary">{event.location}</Typography>
                    <Typography variant="body1" paragraph>{event.description}</Typography>
                    <Typography variant="body2">Date: {formattedDate}</Typography>
                    <Typography variant="body2">Price: {event.price}</Typography>
                    {event.capacity && (
                        <Typography variant="body2">Capacity: {event.capacity}</Typography>
                    )}
                    {event.capacity === '0' && (
                        <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
                            This event is full!
                        </Typography>
                    )}
                    {/* {event.capacity && <Typography variant="body2">Capacity: {event.capacity}</Typography>} */}
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ marginTop: 2 }}
                        onClick={() => window.history.back()}
                    >
                        Back to Events
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ marginTop: 2 }}
                        disabled={event.capacity === '0'}
                        onClick={handleBookEvent}
                    >
                        Book
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
};

export default EventDetailsPage;
