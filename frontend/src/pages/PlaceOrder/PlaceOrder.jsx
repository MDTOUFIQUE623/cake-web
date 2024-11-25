import React, { useEffect, useState } from 'react'
import './PlaceOrder.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)
  const navigate = useNavigate();

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    pincode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    
    if (getTotalCartAmount() === 0) {
        alert("Your cart is empty!");
        return;
    }

    try {
        // Load Razorpay script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK failed to load. Please check your internet connection.");
            return;
        }

        // Prepare order items
        const orderItems = food_list.reduce((acc, item) => {
            if (cartItems[item._id] > 0) {
                acc.push({
                    ...item,
                    quantity: cartItems[item._id]
                });
            }
            return acc;
        }, []);

        // Create order
        const orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 20,
            userId: token
        };

        const response = await axios.post(
            `${url}/api/order/place`,
            orderData,
            { headers: { token } }
        );

        if (!response.data.success) {
            throw new Error(response.data.message || "Error creating order");
        }

        // Configure Razorpay
        const options = {
            key: response.data.key,
            amount: response.data.order.amount,
            currency: response.data.order.currency,
            name: "Bites",
            description: "Food Order Payment",
            order_id: response.data.order.id,
            handler: async function (response) {
                try {
                    const verifyResponse = await axios.post(
                        `${url}/api/order/verify`,
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        },
                        { headers: { token } }
                    );

                    navigate('/verify', { 
                        state: { 
                            success: verifyResponse.data.success,
                            orderId: response.razorpay_order_id,
                            message: verifyResponse.data.message
                        }
                    });
                } catch (error) {
                    console.error("Payment verification error:", error);
                    navigate('/verify', { 
                        state: { 
                            success: false,
                            message: "Error verifying payment"
                        }
                    });
                }
            },
            modal: {
                ondismiss: function() {
                    navigate('/verify', { 
                        state: { 
                            success: false,
                            message: "Payment cancelled by user"
                        }
                    });
                }
            },
            prefill: {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                contact: data.phone
            },
            theme: {
                color: "#f663b4"
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    } catch (error) {
        console.error("Payment error:", error);
        alert(error.message || "Error processing payment");
    }
  };

  

  useEffect(()=>{
    if (!token) {
      navigate('/cart')      
    }
    else if(getTotalCartAmount()===0)
    {
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='pincode' onChange={onChangeHandler} value={data.pincode} type="text" placeholder='Pincode' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()===0?0:20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount() + 20}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
