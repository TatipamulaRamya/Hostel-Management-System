// In your order route handler file (e.g., Routes/OrderRouter.js or similar)
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Order = require('../Models/Order'); // Adjust this path if needed

router.post('/order', async (req, res) => {
    console.log('Received order:', req.body); // Logs the incoming order details

    try {
        const { items, day, userId, totalAmount } = req.body;
        const validUserId = new mongoose.Types.ObjectId("64b1e7b8fcd4b9f9a7c6e013"); // Replace with an actual ObjectId for testing

        // Validate userId
        if (!userId || !ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        // Ensure totalAmount is provided
        if (totalAmount === undefined || totalAmount === null) {
            return res.status(400).json({ message: 'Total amount is required' });
        }

        const newOrder = new Order({
            items,
            day,
            userId: new ObjectId(userId), // Convert to ObjectId
            totalAmount
        });
        
        await newOrder.save();
        res.status(201).json({ message: 'Order saved successfully' });
    } catch (error) {
        console.error('Error saving order:', error); // Log the full error for more detail
        res.status(500).json({ message: 'Failed to save order', error: error.message });
    }
});

module.exports = router;
