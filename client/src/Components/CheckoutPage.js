import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const event = location.state?.event;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email) {
            alert('All fields are required');
            return;
        }

        try {
            setLoading(true);

            const response = await fetch('http://localhost:4005/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation($event_id: Int!, $email: String!) {
                            bookEvent(event_id: $event_id, email: $email) {
                                success
                                message
                            }
                        }
                    `,
                    variables: { event_id: event.event_id, email },
                }),
            });

            const data = await response.json();
            if (data.errors) {
                throw new Error(data.errors[0].message);
            }

            if (data.data.bookEvent.success) {
                if (event.price != 'Free') {
                    navigate(`/paypal-payment/${event.event_id}`);
                } else {
                    alert('Event booked successfully!');
                    navigate('/');
                }
            } else {
                alert(`Booking failed: ${data.data.bookEvent.message}`);
            }
        } catch (error) {
            alert(`Booking failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (!event) {
        return <Typography variant="h6" color="error">Event details not available</Typography>;
    }

    return (
        <Container sx={{ marginTop: 4 }}>
            <Typography variant="h5" gutterBottom>Checkout for {event.title}</Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? 'Booking...' : 'Book Event'}
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default CheckoutPage;
