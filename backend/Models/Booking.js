const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    roomNumber: { type: Number, required: true },
    roomType: { type: String, required: true },
    bookingDate: { type: Date, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
