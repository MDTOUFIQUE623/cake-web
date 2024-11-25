import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
import { razorpay } from '../server.js'
import crypto from 'crypto';


const placeOrder = async (req, res) => {
    try {
        // If you need to use the frontend URL
        const frontend_url = process.env.FRONTEND_URL;
        
        // Create new order in our database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment_verified: false
        });
        await newOrder.save();
        
        // Don't clear cart here anymore
        // We'll clear it after payment verification

        // Create Razorpay order
        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: newOrder._id.toString()
        };

        const razorpayOrder = await razorpay.orders.create(options);

        // Store Razorpay order ID in our order document
        await orderModel.findByIdAndUpdate(newOrder._id, {
            razorpay_order_id: razorpayOrder.id
        });

        res.json({
            success: true,
            order: razorpayOrder,
            key: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error creating order" });
    }
}

const verifyOrder = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        // Create a signature using the order_id and payment_id
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        // Verify signature
        if (razorpay_signature === expectedSign) {
            // Find the order
            const order = await orderModel.findOne({ razorpay_order_id });
            
            if (!order) {
                return res.json({
                    success: false,
                    message: "Order not found"
                });
            }

            // Update order status and payment details
            await orderModel.findByIdAndUpdate(order._id, { 
                payment_verified: true,
                razorpay_payment_id,
                razorpay_signature 
            });

            // Only clear cart after successful payment verification
            await userModel.findByIdAndUpdate(order.userId, { cartData: {} });

            return res.json({
                success: true,
                message: "Payment verified successfully"
            });
        } else {
            return res.json({
                success: false,
                message: "Invalid signature"
            });
        }
    } catch (error) {
        console.error("Verification error:", error);
        res.json({ success: false, message: "Error verifying payment" });
    }
}

const getOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await orderModel.findOne({ razorpay_order_id: orderId });
        
        if (!order) {
            console.log("Order not found in status check:", orderId);
            return res.json({
                success: false,
                message: "Order not found"
            });
        }

        return res.json({
            success: order.payment_verified,
            message: order.payment_verified ? "Payment verified" : "Payment pending"
        });
    } catch (error) {
        console.error("Status check error:", error);
        res.json({ success: false, message: "Error fetching order status" });
    }
};

// user orders for frontend
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// Listing orders for admin panel
const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// api for updating order status
const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export { placeOrder, verifyOrder, getOrderStatus,userOrders,listOrders,updateStatus }