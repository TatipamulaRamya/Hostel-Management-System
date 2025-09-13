import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Home.css';
import hostelImage from './hostel.jpeg';
import menuIcon from './menu-icon.jpg'; // Add a menu icon image in your project folder
import { colors } from '@mui/material';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            setLoggedInUser(localStorage.getItem('loggedInUser'));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const collegeCoordinates = [17.3912, 78.318993];

    const redMarkerIcon = new L.Icon({
        iconUrl: 'https://thumbs.dreamstime.com/z/red-maps-pin-location-map-icon-location-pin-pin-icon-vector-red-maps-pin-location-map-icon-location-pin-pin-icon-vector-vector-140200096.jpg?w=768',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    return (
        <div className="home-container">
            {/* Logout Button */}
            <button className="logout-button" onClick={handleLogout}>Logout</button>

            {/* Navigation Bar */}
            <nav className="navbar">
                <button className="nav-toggle" onClick={() => setIsNavOpen(!isNavOpen)}>
                    <img src={menuIcon} alt="Menu" className="menu-icon" /> {/* Menu icon image */}
                </button>
                <ul className={`nav-links ${isNavOpen ? 'open' : ''}`}>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/room">Room</Link></li>
                    <li><Link to="/foodmenu">Food Menu</Link></li>
                    <li><Link to="/facilities">Facilities</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                   
                    <li><Link to="/discussion-room">Discussion Room</Link></li> {/* New Discussion Room Link */}
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>

            {/* Hero Section */}
            <div className="hero-section">
                <h1>Welcome to Our Hostel{loggedInUser ? `, ${loggedInUser}` : ''}!</h1>
                <p>Experience comfort, community, and convenience at your home away from home.</p>
                <button className="hero-button" onClick={() => navigate('/about')}>Learn More</button>
            </div>

            
            {/* Larger Hostel Image */}
            <div className="hostel-image">
                <img src={hostelImage} alt="Hostel" onError={(e) => (e.target.src = 'placeholder-image-url')} />
            </div>

            {/* Map */}
            <div className="map-container">
                <MapContainer center={collegeCoordinates} zoom={13} className="leaflet-container">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={collegeCoordinates} icon={redMarkerIcon}>
                        <Popup>College Contact Info. Gandipet, Hyderabad, Telangana, PIN : 500075 Phone: 040-24193276 Mobile: 8466997201</Popup>
                    </Marker>
                </MapContainer>
            </div>

            <ToastContainer />
        </div>
    );
}

export default Home;
