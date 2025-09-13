// routes/BookingRouter.js
const express = require('express');
const router = express.Router();
const BookingController = require('../Controllers/BookingController'); // Correct path to the controller

router.post('/create', BookingController.createBooking);

module.exports = router;
