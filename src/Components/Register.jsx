import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setRegistrationError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
      },
        {
          "Content-Type": "application/json"
        })

      // Registration successful
      console.log('Registration successful:', response.data);
      navigate('/'); 
    } catch (error) {
      console.error('Registration error:', error);
      // setRegistrationError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="register-input"
        />
        <button onClick={handleRegister} className="register-button">
          Register
        </button>
        {registrationError && <p className="error-message">{registrationError}</p>}
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
