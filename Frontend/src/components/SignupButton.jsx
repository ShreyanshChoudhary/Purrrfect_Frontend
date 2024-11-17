// src/components/SignupButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../App.css';

function SignupButton() {
    return (
        <Link to="/signup-login">
            <Button 
                className="signup-button" 
                variant="dark"
            >
                Sign Up/Login
            </Button>
        </Link>
    );
}

export default SignupButton;