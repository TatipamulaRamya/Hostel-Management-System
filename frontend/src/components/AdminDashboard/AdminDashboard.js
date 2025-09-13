import React, { useEffect, useState } from 'react';

function AdminDashboard() {
    const [data, setData] = useState({ users: [], rooms: [] });

    useEffect(() => {
        const fetchAdminData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:5000/admin/dashboard-data', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                if (response.ok) {
                    setData(result);
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                console.error('Error fetching admin dashboard data:', error);
            }
        };

        fetchAdminData();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Users</h2>
            <ul>
                {data.users.map((user) => (
                    <li key={user._id}>{user.name} - {user.email}</li>
                ))}
            </ul>
            <h2>Room Details</h2>
            <ul>
                {data.rooms.map((room) => (
                    <li key={room._id}>
                        Room {room.roomNumber} - {room.status}
                        {/* Add other details as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminDashboard;
