import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupInfo),
            });

            const result = await response.json();
            console.log(result);

            if (result && result.success) {
                handleSuccess(result.message || "Signup successful!");
                setTimeout(() => navigate('/home'), 1000);
            } else if (result && result.error) {
                handleError(result.error.message || "An error occurred during signup.");
            } else {
                handleSuccess("Signup Successful!");
            }
        } catch (err) {
            handleError("Couldn't sign up. Please try again.");
            console.error("Signup error:", err);
        }
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: 'auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Signup</h1>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSignup}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }} htmlFor='username'>Username</label>
                    <input
                        style={{
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px',
                            transition: 'border-color 0.3s'
                        }}
                        onChange={handleChange}
                        type='text'
                        name='username'
                        placeholder='Enter your username...'
                        value={signupInfo.username}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }} htmlFor='email'>Email</label>
                    <input
                        style={{
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px',
                            transition: 'border-color 0.3s'
                        }}
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                        required
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }} htmlFor='password'>Password</label>
                    <input
                        style={{
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px',
                            transition: 'border-color 0.3s'
                        }}
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                        required
                    />
                </div>
                <button style={{
                    padding: '10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'background-color 0.3s',
                    ':hover': {
                        backgroundColor: '#0056b3'
                    }
                }} type='submit'>Sign Up</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
