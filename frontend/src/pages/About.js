import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-page container mt-5 p-4 shadow-lg rounded">
            <h2 className="text-center mb-4">About the Hostel</h2>
            <p className="intro-text">
                Welcome to our Hostel Management System! Our hostel provides a comfortable, safe, and vibrant living environment for all students. 
                Discover what makes our facilities unique below!
            </p>

            <section className="facility-section">
                <h4 className="section-title">Facilities</h4>
                <ul className="styled-list">
                    <li>Fully furnished rooms with essential amenities</li>
                    <li>24/7 Wi-Fi access</li>
                    <li>Common room for socializing and leisure activities</li>
                    <li>Study area equipped with computers</li>
                    <li>Kitchen facilities for cooking</li>
                    <li>Laundry services available</li>
                </ul>
            </section>

            <section className="service-section">
                <h4 className="section-title">Services</h4>
                <ul className="styled-list">
                    <li>Round-the-clock security for student safety</li>
                    <li>Maintenance team for quick repairs</li>
                    <li>Regular cleaning services</li>
                    <li>Support services for inquiries and assistance</li>
                </ul>
            </section>

            <section className="rules-section">
                <h4 className="section-title">Rules and Regulations</h4>
                <ul className="styled-list">
                    <li>Respect fellow residents and their privacy.</li>
                    <li>No loud music or disturbances after 10 PM.</li>
                    <li>Maintain cleanliness in common areas.</li>
                    <li>Report any damages or issues to management immediately.</li>
                    <li>Guests must be registered at the front desk.</li>
                </ul>
            </section>

            <p className="closing-text text-center">
                We strive to create a community that fosters growth, learning, and friendship. Thank you for choosing our hostel!
            </p>
        </div>
    );
};

export default About;
