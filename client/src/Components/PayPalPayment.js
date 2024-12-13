import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';

const PayPalPayment = ({ event }) => {
    const navigate = useNavigate();

    const handleApprove = async (orderID) => {
        alert('Payment successful!');
        navigate('/');
    };

    return (
        <PayPalScriptProvider options={{ "client-id": "ARHQu_yOQYNigMGwNVsvrsPP9EbVfcj6Gs2ZTH4E06RezZU2rdq4fa89Ycy2A5IYO72o9OkR3zd-D6K0" }}>
            <div style={{ marginTop: 20 }}>
                {/* <h3>Pay for {event.title}</h3> */}
                <h3>Pay for </h3>
                <PayPalButtons
                style={{ shape: "pill", layout: "horizontal" }}
                createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: event.price.toFixed(2), 
                                    },
                                },
                            ],
                        });
                    }}
                    // onApprove={(data, actions) => {
                    //     return actions.order.capture().then(() => {
                    //         handleApprove(data.orderID);
                    //     });
                    // }}
                    onError={(err) => {
                        alert('Payment failed. Please try again.');
                    }}
                />
            </div>
        </PayPalScriptProvider>
    );
};

export default PayPalPayment;
