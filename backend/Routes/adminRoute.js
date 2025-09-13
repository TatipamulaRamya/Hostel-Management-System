// backend/routes/adminRoute.js
const express = require('express');
const router = express.Router();
const User = require('../Models/User'); // Adjust path based on your structure
 // Adjust path as necessary
const { isAdmin } = require('../Middlewares/authMiddleware'); // Middleware to check admin role

// GET /admin/dashboard-data - Fetch user and room data for admin
router.get('/dashboard-data', isAdmin, async (req, res) => {
    try {
        const users = await User.find({}, 'name email'); // Fetch user names and emails
        const rooms = await Room.find(); // Adjust fields as needed
        res.status(200).json({ users, rooms });
    } catch (error) {
        console.error("Error fetching admin data:", error);
        res.status(500).json({ message: "Failed to load data." });
    }
});

module.exports = router;
