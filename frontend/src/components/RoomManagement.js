import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Room.css';

const RoomManagement = () => {
    // Define your state variables
    const [rooms, setRooms] = useState({ /* rooms data */ });
    const [bookings, setBookings] = useState([]);
    const [currentBooking, setCurrentBooking] = useState({ /* booking data */ });
    const [showBookingPopup, setShowBookingPopup] = useState(false);
    const [bookingMessage, setBookingMessage] = useState("");

    // Function to open booking popup
    const openBookingPopup = () => {
        setShowBookingPopup(true);
    };

    // Your handleBookingSubmit function here
    const handleBookingSubmit = async (event) => {
        event.preventDefault();
        const bookingDate = event.target['booking-date'].value;

        const newBooking = {
            roomNumber: currentBooking.roomNumber,
            roomType: currentBooking.roomType,
            bookingDate,
            price: currentBooking.price,
        };

        try {
            console.log("Submitting booking:", newBooking); // Debug log
            const response = await fetch('http://localhost:5000/bookings/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBooking),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Booking successful:", result); // Log success

                // Update bookings state with the new booking
                setBookings([...bookings, result]);
                setShowBookingPopup(false);
                setBookingMessage(`Room ${currentBooking.roomNumber} has been successfully booked!`);

                // Update room availability based on the booking
                updateRoomAvailability(currentBooking.roomNumber, currentBooking.roomType);
            } else {
                console.error('Failed to store booking in the database');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {/* JSX content including booking form */}
            {showBookingPopup && (
                <div>
                    <form onSubmit={handleBookingSubmit}>
                        {/* Form fields */}
                        <button type="submit">Confirm Booking</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default RoomManagement;
