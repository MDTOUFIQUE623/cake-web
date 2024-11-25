import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Verify.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const location = useLocation();
    const { url, token, clearCart } = useContext(StoreContext);
    const navigate = useNavigate();
    
    const verifyPayment = async () => {
        try {
            // Get payment status from location state
            const { success, orderId, message } = location.state || {};
            
            if (!location.state) {
                alert("Invalid payment verification");
                navigate("/cart");
                return;
            }

            if (!success) {
                alert(message || "Payment failed");
                navigate("/cart");
                return;
            }

            // Verify the order status on backend
            const response = await axios.get(
                `${url}/api/order/status/${orderId}`,
                { headers: { token } }
            );

            if (response.data.success) {
                clearCart(); // Clear the cart after successful payment
                navigate("/myorders");
            } else {
                alert(response.data.message || "Order verification failed");
                navigate("/cart");
            }
        } catch (error) {
            console.error("Verification error:", error);
            alert(error.response?.data?.message || "Error verifying payment");
            navigate("/cart");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            <div className="verify-content">
                <div className="spinner"></div>
                <p>Verifying your payment...</p>
            </div>
        </div>
    );
};

export default Verify;
