import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaDog } from "react-icons/fa";
import { useUser } from "./contexts/UserContext";
import Cart from "./Cart";
import './Header.css';

function Header() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, isAuthenticated, logout } = useUser();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <Navbar className="navbar-custom" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" className="navbar-brand">
          Purrrfect <FaDog size={24} className="dog-logo" />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        
        <Navbar.Collapse id="navbarScroll">
          {/* Navigation Links */}
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <NavDropdown title="Products" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/products">All Products</NavDropdown.Item>
              <NavDropdown.Item href="/products/pets">Pets</NavDropdown.Item>
              <NavDropdown.Item href="/products/food">Food</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/products/accessories">Accessories</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/contact">Contact us</Nav.Link>
          </Nav>

          {/* Search Bar */}
          <div className="form-container">
            <Form.Control 
              type="search" 
              placeholder="Search" 
              aria-label="Search" 
              className="form-control"
            />
            <Button className="search-button">Search</Button>
          </div>

          {/* User Section - Simple and Clean */}
          {isAuthenticated ? (
            <div className="profile-container">
              <span className="profile-name">{user?.name || user?.email || 'User'}</span>
              <Button 
                variant="link" 
                onClick={handleLogout} 
                className="logout-button"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              href="/auth" 
              className="custom-signup-login-button"
            >
              Sign Up / Login
            </Button>
          )}

          {/* Cart Component */}
          <Cart />

          {/* Theme Toggle */}
          <div className="theme-toggle">
            <label className="switch">
              <input 
                type="checkbox" 
                onChange={toggleTheme} 
                checked={theme === "dark"} 
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;