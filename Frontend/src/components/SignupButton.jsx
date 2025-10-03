import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import '../App.css';

function SignupButton() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user authentication status from backend
        fetch('/api/auth/user', { credentials: 'include' }) // Adjust API endpoint
            .then(response => response.json())
            .then(data => setUser(data.user)) // Assuming API returns { user: { name, email } }
            .catch(() => setUser(null));
    }, []);

    return (
        <>
            {user ? (
                <Dropdown>
                    <Dropdown.Toggle variant="dark" className="profile-button">
                        {user.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as={Link} to="/logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Link to="/signup-login">
                    <Button className="signup-button" variant="dark">
                        Sign Up/Login
                    </Button>
                </Link>
            )}
        </>
    );
}

export default SignupButton;
