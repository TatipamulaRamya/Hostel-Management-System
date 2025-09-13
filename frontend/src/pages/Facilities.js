// src/components/Facilities.js

import React from 'react';
import './Facilities.css'; // Include custom styles if needed

const Facilities = () => {
    return (
        <div className="facilities-page container mt-5">
            <h2>Facilities Provided</h2>
            <p>
                Our hostel is equipped with modern amenities to make student life comfortable and convenient. Here are the key facilities available to all residents.
            </p>

            <div className="facility-list">
                <div className="facility-item">
                    <h4>Fully Furnished Rooms</h4>
                    <p>Rooms are equipped with essential furniture including beds, study desks, wardrobes, and shelves.</p>
                </div>
                <div className="facility-item">
                    <h4>High-Speed Wi-Fi</h4>
                    <p>24/7 high-speed internet access to help with studies, research, and staying connected with friends and family.</p>
                </div>
                <div className="facility-item">
                    <h4>Common Room</h4>
                    <p>A comfortable space for socializing, equipped with seating areas, a television, and board games.</p>
                </div>
                <div className="facility-item">
                    <h4>Study Area</h4>
                    <p>Dedicated quiet space for focused study sessions, with access to computers and additional resources.</p>
                </div>
                <div className="facility-item">
                    <h4>Kitchen Facilities</h4>
                    <p>Shared kitchen with essential cooking appliances for those who wish to prepare their own meals.</p>
                </div>
                <div className="facility-item">
                    <h4>Laundry Services</h4>
                    <p>On-site laundry facilities with washing machines and dryers available for residents.</p>
                </div>
                <div className="facility-item">
                    <h4>Security</h4>
                    <p>24-hour surveillance and on-site security personnel to ensure the safety of all residents.</p>
                </div>
            </div>
        </div>
    );
};

export default Facilities;
