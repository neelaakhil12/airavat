const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @route POST /api/payment/checkout
router.post('/checkout', protect, async (req, res) => {
    try {
        const options = {
            amount: 129 * 100, // Amount in paise (129 INR)
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Razorpay order creation failed' });
    }
});

// @route POST /api/payment/verify
router.post('/verify', protect, async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        try {
            const user = await User.findById(req.user.id);
            user.isSubscribed = true;
            // Set expiry to 30 days from now
            user.subscriptionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
            await user.save();

            res.status(200).json({ status: "success", message: "Subscription activated" });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update subscription status' });
        }
    } else {
        res.status(400).json({ status: "failure", message: "Invalid signature" });
    }
});

module.exports = router;
