import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DiscussionRoom.css';

const socket = io('http://localhost:5000'); // Connect to the server

function DiscussionRoom({ userRole, userId }) {
    const [message, setMessage] = useState('');
    const [notices, setNotices] = useState([]);
    const [userMessages, setUserMessages] = useState([]);
    const [adminNotice, setAdminNotice] = useState('');

    useEffect(() => {
        // Fetch existing notices and user messages
        fetch('http://localhost:5000/notices')
            .then((response) => response.json())
            .then((data) => setNotices(data.notices || []))
            .catch((error) => console.error("Failed to fetch notices:", error));

        fetch('http://localhost:5000/messages')
            .then((response) => response.json())
            .then((data) => setUserMessages(data.messages || []))
            .catch((error) => console.error("Failed to fetch user messages:", error));

        // Listen for new notices
        socket.on('newNotice', (notice) => {
            setNotices((prevNotices) => [...prevNotices, notice]);
            toast.info("📢 New notice posted!", { icon: "📌" });
        });

        return () => socket.off('newNotice');
    }, []);

    // Send a new user message to the admin
    const handleSendMessage = async () => {
        if (message.trim() === '') {
            toast.error('Message cannot be empty!');
            return;
        }

        const newMessage = {
            userId,
            text: message,
            time: new Date().toLocaleTimeString(),
        };

        try {
            await fetch('http://localhost:5000/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMessage),
            });
            setUserMessages([...userMessages, newMessage]);
            setMessage('');
            toast.success("📨 Message sent to admin!");
        } catch (error) {
            toast.error("Failed to send message.");
            console.error("Message sending error:", error);
        }
    };

    // Admin posts a new notice
    const handlePostNotice = async () => {
        if (adminNotice.trim() === '') {
            toast.error('Notice cannot be empty!');
            return;
        }

        const newNotice = {
            title: "Notice from Admin",
            message: adminNotice,
            time: new Date().toLocaleTimeString(),
        };

        try {
            await fetch('http://localhost:5000/notices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newNotice),
            });
            socket.emit('sendNotice', newNotice); // Notify other users
            setNotices([...notices, newNotice]);
            setAdminNotice('');
            toast.success("🚀 Notice posted!");
        } catch (error) {
            toast.error("Failed to post notice.");
            console.error("Notice posting error:", error);
        }
    };

    return (
        <div className="discussion-room-container">
            <h1>🌐 Hostel Discussion Room</h1>

            {/* Notice Board */}
            <div className="notice-board">
                <h2>📢 Notice Board</h2>
                <ul className="notices-list">
                    {notices.map((notice, index) => (
                        <li key={index} className="notice-item">
                            <strong>{notice.title}</strong>: {notice.message} <em>({notice.time})</em>
                        </li>
                    ))}
                </ul>

                {/* Admin-only Notice Form */}
                {userRole === 'admin' && (
                    <div className="admin-notice-form">
                        <textarea
                            value={adminNotice}
                            onChange={(e) => setAdminNotice(e.target.value)}
                            placeholder="Enter a notice for the notice board..."
                            className="notice-textarea"
                        />
                        <button onClick={handlePostNotice} className="post-notice-btn">Post Notice</button>
                    </div>
                )}
            </div>

            {/* User Messages to Admin */}
            <div className="message-form">
                <h2>💬 Send Message to Admin</h2>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message to the admin..."
                    className="message-textarea"
                />
                <button onClick={handleSendMessage} className="send-message-btn">Send Message</button>
            </div>

            {/* Display User Messages (Admin only) */}
            {userRole === 'admin' && (
                <div className="user-messages">
                    <h2>📝 User Messages</h2>
                    <ul className="messages-list">
                        {userMessages.map((msg, index) => (
                            <li key={index} className="message-item">
                                <strong>User {msg.userId}</strong>: {msg.text} <em>({msg.time})</em>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}

export default DiscussionRoom;
