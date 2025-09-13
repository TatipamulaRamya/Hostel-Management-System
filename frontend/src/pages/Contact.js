import React from 'react';
import './Contact.css';

function Contact() {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <div className="contact-details">
                <p><strong>Phone:</strong> 7207617449</p>
                <p><strong>Email:</strong> <a href="mailto:shivanikune22@gmail.com">shivanikune22@gmail.com</a></p>
                <p><strong>Address:</strong> 1234 Main St, City, Country</p>
                <p><strong>Business Hours:</strong> Mon - Fri, 9 AM - 5 PM</p>
            </div>
            <div className="contact-details">
                <p><strong>Phone:</strong> 7093876838</p>
                <p><strong>Email:</strong> <a href="mailto:ramyatatipamula848@gmail.com">ramyatatipamula848@gmail.com</a></p>
                <p><strong>Address:</strong> 1234 Main St, City, Country</p>
                <p><strong>Business Hours:</strong> Mon - Fri, 9 AM - 5 PM</p>
            </div>
        </div>
    );
}

export default Contact;
