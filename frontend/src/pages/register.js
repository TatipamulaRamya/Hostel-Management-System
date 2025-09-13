import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Register({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('https://deploy-mern-app-1-api.vercel.app/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Signup failed');
        }

        const data = await response.json();
        console.log('Signup successful:', data);

        // Assuming you want to store the user info and navigate after signup
        localStorage.setItem("token", data.token); // Store JWT token
        localStorage.setItem("userId", data._id); // Store user ID

        setUser({
            token: data.token,
            userId: data._id,
            email: data.email,
            name: data.name
        });

        setMessage("User Registered Successfully!");
        navigate("/profile"); // Redirect to the profile page after successful signup
    } catch (error) {
        setMessage(error.message);
        console.error('Error:', error);
    }
};

  return (
    <div className="login-bg">
      <div className="login-overlay">
        <form onSubmit={handleSignup} className="form">
          <h3 className="title">Register</h3>
          {message && <p className="error-message">{message}</p>}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              id="input"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              id="input"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              id="input"
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" id="login-button">
              Register
            </button>
          </div>
          <p className="forgot-password text-right" id="another-text">
            Already have an account? <a href="/login" className="form-link">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
