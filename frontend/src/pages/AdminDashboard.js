import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isAdmin = localStorage.getItem('isAdmin') === 'true';

        if (!token || !isAdmin) {
            navigate('/login');  // Redirect to login if not logged in or not admin
            return;
        }

        const fetchDashboardData = async () => {
            try {
                const response = await fetch('http://localhost:5000/admin/dashboard', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const result = await response.json();
                if (response.ok) {
                    setMessage(result.message);
                } else {
                    setMessage(result.message);
                }
            } catch (err) {
                console.error('Error fetching admin dashboard:', err);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>{message}</p>
        </div>
    );
}

export default AdminDashboard;
