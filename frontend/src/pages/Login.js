import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo),
            });

            const result = await response.json();
            console.log("Login response:", result); // Log the entire response

            if (response.ok && result.token) {
                handleSuccess("Login successful!");
                localStorage.setItem('token', result.token);
                localStorage.setItem('role', result.role);
                console.log('User isAdmin:', result.isAdmin); // Log isAdmin status

                setTimeout(() => {
                    if (result.isAdmin) {
                        navigate('/admin'); // Redirect to admin dashboard if admin
                    } else {
                        navigate('/home'); // Otherwise, redirect to user home page
                    }
                }, 1000);
            } else {
                handleError(result.message || "Login failed.");
            }
        } catch (err) {
            console.error("Error during login:", err);
            handleError("An error occurred while logging in. Please try again.");
        }
    };

    const containerStyle = {
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        fontSize: '14px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxSizing: 'border-box',
        outline: 'none',
    };

    const inputFocusStyle = {
        borderColor: '#4CAF50',
        boxShadow: '0 0 5px rgba(76, 175, 80, 0.5)',
    };

    const buttonStyle = {
        padding: '12px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    };

    const buttonDisabledStyle = {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    };

    const buttonHoverStyle = {
        backgroundColor: '#45a049',
    };

    const spanStyle = {
        fontSize: '14px',
        color: '#555',
        marginTop: '10px',
        display: 'inline-block',
    };

    const linkStyle = {
        color: '#4CAF50',
        textDecoration: 'none',
        fontWeight: 'bold',
    };

    return (
        <div style={containerStyle}>
            <h1>Login</h1>
            <form onSubmit={handleLogin} style={formStyle}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                        required
                        style={inputStyle}
                        onFocus={(e) => e.target.style = inputFocusStyle}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                        required
                        style={inputStyle}
                        onFocus={(e) => e.target.style = inputFocusStyle}
                    />
                </div>
                <button type='submit' style={buttonStyle}>Login</button>
                <span style={spanStyle}>
                    Don't have an account? <Link to="/signup" style={linkStyle}>Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
