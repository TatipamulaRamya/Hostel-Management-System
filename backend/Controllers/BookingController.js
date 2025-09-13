// Controllers/BookingController.js

// Import the Booking model
const Booking = require('../Models/Booking');

// Controller function to create a new booking
const createBooking = async (req, res) => {
    try {
        // Extract booking details from the request body
        const { userId, roomId, startDate, endDate, status } = req.body;

        // Create a new booking instance
        const newBooking = new Booking({
            userId,
            roomId,
            startDate,
            endDate,
            status,
        });

        // Save the booking to the database
        await newBooking.save();

        // Send a success response
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        // Send an error response if something goes wrong
        res.status(500).json({ message: 'Failed to create booking', error: error.message });
    }
};

// Export the createBooking function
module.exports = { createBooking };
