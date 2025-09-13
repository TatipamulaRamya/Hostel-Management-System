import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS
import DatePicker from 'react-datepicker'; // Import DatePicker
import './Room.css';

const RoomManagement = () => {
    const [rooms, setRooms] = useState({
        boys: {
            rooms: [
                { number: 101, type: "single", status: "available", imageUrl: "https://tse4.mm.bing.net/th?id=OIP.TWrb2yD1hyKqGoVVLNxaEAAAAA&pid=Api&P=0&h=180" },
                { number: 102, type: "double", status: "available", imageUrl: "https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202205/iim_v-x800.jpg?wVdCvLsG4Sl1oJvrcCRUjmFAa.1PBh9Z" },
                { number: 103, type: "quad", status: "available", imageUrl: "https://www.ranimeyyammaihostel.org/wp-content/uploads/2021/04/04_s.jpg" },
            ],
        },
        girls: {
            rooms: [
                { number: 201, type: "single", status: "available", imageUrl: "https://tse4.mm.bing.net/th?id=OIP.TWrb2yD1hyKqGoVVLNxaEAAAAA&pid=Api&P=0&h=180" },
                { number: 202, type: "double", status: "available", imageUrl: "https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202205/iim_v-x800.jpg?wVdCvLsG4Sl1oJvrcCRUjmFAa.1PBh9Z" },
                { number: 203, type: "quad", status: "available", imageUrl: "https://www.ranimeyyammaihostel.org/wp-content/uploads/2021/04/04_s.jpg" },
            ],
        },
    });

    const [bookings, setBookings] = useState([]);
    const [trialBookings, setTrialBookings] = useState([]); // State for trial bookings
    const [currentBooking, setCurrentBooking] = useState({ roomNumber: '', roomType: '', bookingDate: new Date() });
    const [showBookingPopup, setShowBookingPopup] = useState(false);
    const [showTrialPopup, setShowTrialPopup] = useState(false); // State for trial booking popup
    const [showRoomDetailsPopup, setShowRoomDetailsPopup] = useState(false);
    const [selectedRoomDetails, setSelectedRoomDetails] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation message

    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const storedTrials = JSON.parse(localStorage.getItem('trialBookings')) || []; // Load trial bookings
        setBookings(storedBookings);
        setTrialBookings(storedTrials);
    }, []);

    const openRoomDetailsPopup = (room) => {
        setSelectedRoomDetails(room);
        setShowRoomDetailsPopup(true);
    };

    const closeRoomDetailsPopup = () => {
        setShowRoomDetailsPopup(false);
    };

    const openBookingPopup = () => {
        setCurrentBooking({ roomNumber: selectedRoomDetails.number, roomType: selectedRoomDetails.type, bookingDate: new Date() });
        setShowBookingPopup(true);
    };

    const openTrialPopup = (room) => {
        setCurrentBooking({ roomNumber: room.number, roomType: room.type, bookingDate: new Date() }); // Set current booking with selected room details
        setShowTrialPopup(true); // Open trial booking popup
    };

    const handleTrialSubmit = (event) => {
        event.preventDefault();
        const trialEndDate = new Date(currentBooking.bookingDate);
        trialEndDate.setDate(trialEndDate.getDate() + 7); // Set trial period to 1 week

        const newTrialBooking = { roomNumber: currentBooking.roomNumber, roomType: currentBooking.roomType, trialStartDate: currentBooking.bookingDate, trialEndDate };
        const updatedTrialBookings = [...trialBookings, newTrialBooking];

        localStorage.setItem('trialBookings', JSON.stringify(updatedTrialBookings));
        setTrialBookings(updatedTrialBookings);
        setShowTrialPopup(false);
        setShowConfirmation(true); // Show confirmation message for trial booking
        setTimeout(() => setShowConfirmation(false), 3000); // Hide confirmation after 3 seconds
    };

    const handleBookingSubmit = (event) => {
        event.preventDefault();
        const bookingDate = currentBooking.bookingDate.toISOString().split('T')[0];

        const newBooking = { roomNumber: currentBooking.roomNumber, roomType: currentBooking.roomType, bookingDate };
        const updatedBookings = [...bookings, newBooking];

        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        setBookings(updatedBookings);
        setShowBookingPopup(false);
        setShowRoomDetailsPopup(false);
        setShowConfirmation(true); // Show confirmation message
        setTimeout(() => setShowConfirmation(false), 3000); // Hide confirmation after 3 seconds
    };

    const handleEditBooking = (booking) => {
        setCurrentBooking(booking);
        setShowBookingPopup(true);
    };

    const handleDeleteBooking = (bookingToDelete) => {
        const updatedBookings = bookings.filter((booking) => booking !== bookingToDelete);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        setBookings(updatedBookings);
    };

    const getFacilities = (type) => {
        if (type === "single") {
            return [
                { name: "Study Chair", url: "https://www.sibmhyd.edu.in/assets/img/gallery/10-04-2015/accomodation/Study%20Table%20-%20Hostel%20Room%20Facilities%20-%20SIBM%20Hyderabad.jpg" },
                { name: "Private Washroom", url: "https://img.cdn.zostel.com/cache/_a507eb094a82da6feb2d66c81163a44d/089_Washroom_06_1000x800.jpg" },
                { name: "Locker", url: "https://cdn.shopify.com/s/files/1/0149/9224/4800/products/Hostel_Lockers4_1024x1024.jpg?v=1549273815" }
            ];
        } else if (type === "double") {
            return [
                { name: "Study Chair", url: "https://foyr.com/learn/wp-content/uploads/2019/02/Home-Study-Room-Flooring.jpg" },
                { name: "Private Washroom", url: "https://img.cdn.zostel.com/cache/_a507eb094a82da6feb2d66c81163a44d/089_Washroom_06_1000x800.jpg" },
                { name: "Locker", url: "https://cdn.shopify.com/s/files/1/0149/9224/4800/products/Hostel_Lockers4_1024x1024.jpg?v=1549273815" }
            ];
        } else if (type === "quad") {
            return [
                { name: "Study Chair", url: "https://www.homeguide.com.sg/wp-content/uploads/2020/05/Home-Interior-Design-Tips-4-Study-Area-Ideas-to-Embrace-and-Execute.jpg" },
                { name: "Private Washroom", url: "https://img.cdn.zostel.com/cache/_a507eb094a82da6feb2d66c81163a44d/089_Washroom_06_1000x800.jpg" },
                { name: "Locker", url: "https://cdn.shopify.com/s/files/1/0149/9224/4800/products/Hostel_Lockers4_1024x1024.jpg?v=1549273815" }
            ];
        }
        return [];
    };

    return (
        <div>
            <header className="bg-dark text-white text-center p-4">
                <h1>Hostel Room Management</h1>
            </header>

            <div className="container mt-4">
                {showConfirmation && (
                    <div className="alert alert-success" role="alert">
                        Your booking has been processed successfully!
                    </div>
                )}
                <h2>Available Rooms</h2>
                {Object.entries(rooms).map(([gender, roomData]) => (
                    <div key={gender}>
                        <h3>{gender.charAt(0).toUpperCase() + gender.slice(1)} Rooms</h3>
                        <div className="row">
                            {roomData.rooms.map((room) => (
                                <div key={room.number} className="col-md-4">
                                    <div className="card">
                                        <img src={room.imageUrl} className="card-img-top" alt={`Room ${room.number}`} />
                                        <div className="card-body">
                                            <h5 className="card-title">Room {room.number}</h5>
                                            <p className="card-text">Type: {room.type}</p>
                                            <p className="card-text">Status: {room.status}</p>
                                            <button className="btn btn-primary" onClick={() => openRoomDetailsPopup(room)}>View Details</button>
                                            <button className="btn btn-success ms-2" onClick={() => openTrialPopup(room)}>Trial Booking</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Booking Popup */}
                {showBookingPopup && (
                    <div className="modal show d-block" style={{ zIndex: 1050 }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Booking Room {currentBooking.roomNumber}</h5>
                                    <button type="button" className="close" onClick={() => setShowBookingPopup(false)}>&times;</button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleBookingSubmit}>
                                        <div className="form-group">
                                            <label>Room Type</label>
                                            <input type="text" className="form-control" value={currentBooking.roomType} readOnly />
                                        </div>
                                        <div className="form-group">
                                            <label>Booking Date</label>
                                            <DatePicker selected={currentBooking.bookingDate} onChange={(date) => setCurrentBooking({ ...currentBooking, bookingDate: date })} className="form-control" />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Confirm Booking</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                

                {/* Trial Booking Popup */}
                {showTrialPopup && (
                    <div className="modal show d-block" style={{ zIndex: 1050 }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Trial Booking Room {currentBooking.roomNumber}</h5>
                                    <button type="button" className="close" onClick={() => setShowTrialPopup(false)}>&times;</button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleTrialSubmit}>
                                        <div className="form-group">
                                            <label>Room Type</label>
                                            <input type="text" className="form-control" value={currentBooking.roomType} readOnly />
                                        </div>
                                        <div className="form-group">
                                            <label>Trial Start Date</label>
                                            <input type="text" className="form-control" value={currentBooking.bookingDate.toDateString()} readOnly />
                                        </div>
                                        <div className="form-group">
                                            <label>Trial End Date</label>
                                            <input type="text" className="form-control" value={new Date(currentBooking.bookingDate.setDate(currentBooking.bookingDate.getDate() + 7)).toDateString()} readOnly />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Confirm Trial Booking</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Room Details Popup */}
                {showRoomDetailsPopup && (
                    <div className="modal show d-block" style={{ zIndex: 1050 }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Room {selectedRoomDetails.number} Details</h5>
                                    <button type="button" className="close" onClick={closeRoomDetailsPopup}>&times;</button>
                                </div>
                                <div className="modal-body">
                                    <p><strong>Type:</strong> {selectedRoomDetails.type}</p>
                                    <p><strong>Status:</strong> {selectedRoomDetails.status}</p>
                                    <h6>Facilities:</h6>
                                    <ul>
                                        {getFacilities(selectedRoomDetails.type).map(facility => (
                                            <li key={facility.name}>
                                                <img src={facility.url} alt={facility.name} style={{ width: '50px', marginRight: '10px' }} />
                                                {facility.name}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="btn btn-primary" onClick={openBookingPopup}>Book Room</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoomManagement;
