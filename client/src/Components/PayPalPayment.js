import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';

const PayPalPayment = ({ event }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isPaid, setIsPaid] = useState(false);

    // Create an order using GraphQL
    const createOrder = async () => {
        try {
            const response = await fetch("http://localhost:4005/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `
                        mutation createPaymentIntent($description: String!, $amount: Float!) {
                            createPaymentIntent(description: $description, amount: $amount) {
                                id
                            }
                        }
                    `,
                    variables: {
                        description: 'Payment',
                        amount: 20.00,
                    },
                }),
            });

            const result = await response.json();
            console.log('Response Status:', response.status);
        console.log('Response Body:', result);
            if (result.errors) {
              console.error('GraphQL Errors:', result.errors);
                throw new Error(result.errors[0].message);
            }

            return result.data.createPaymentIntent.id;
        } catch (err) {
            console.error("Error creating order:", err);
            setError("An error occurred while creating the order. Please try again.");
        }
    };

    // Handle successful payment approval
    const handleApprove = async (orderId) => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:4005/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: `
                        mutation capturePayment($orderId: String!) {
                            capturePayment(orderId: $orderId) {
                                id
                                status
                            }
                        }
                    `,
                    variables: {
                        orderId,
                    },
                }),
            });

            const result = await response.json();
            if (result.errors || result.data.capturePayment.status !== "COMPLETED") {
                throw new Error("Payment could not be completed.");
            }

            setIsPaid(true);
            alert("Payment successful!");
            navigate('/');
        } catch (err) {
            console.error("Error capturing payment:", err);
            setError("An error occurred while processing your payment.");
        } finally {
            setLoading(false);
        }
    };

    const handleError = (err) => {
        console.error("PayPal checkout error:", err);
        setError("An error occurred during the payment process. Please try again.");
    };

    return (
        <PayPalScriptProvider
            options={{
                "client-id": "AeWUtxTl7UAIu5jiqfYMdE6Q-2l61BvaSQ2YWUI6__ecNT9BrCrcFQ0k7tn2cWr09P0R2Hfd_r0_flfx",
            }}
        >
            <div style={{ marginTop: 20 }}>
                <h3>Pay for {event?.title || "Event"}</h3>
                {isPaid ? (
                    <p style={{ color: 'green' }}>Payment Successful!</p>
                ) : loading ? (
                    <p>Processing payment...</p>
                ) : (
                    <PayPalButtons
                        style={{ shape: "pill", layout: "horizontal" }}
                        createOrder={(data, actions) => createOrder()}
                        onApprove={(data, actions) => handleApprove(data.orderID)}
                        onError={handleError}
                    />
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </PayPalScriptProvider>
    );
};

export default PayPalPayment;
