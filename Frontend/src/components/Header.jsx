import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SignupButton from "./SignupButton";
import '../App.css'; // Ensure this file includes your custom CSS

function NavScrollExample() {
  // State for theme (light/dark)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply the theme to the body class
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Navbar className={`navbar-custom ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`} expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Purrrfect</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">About</Nav.Link>
            <NavDropdown title="Products" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Pets</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Food</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Accessories</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">Contact us</Nav.Link>
          </Nav>
          <div className="form-container">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <Button className="custom-search-button">
                Search
              </Button>
            </Form>
          </div>
          <div className="signup-button-container">
            <SignupButton className="custom-signup-button" />
          </div>
          {/* Dark/Light Mode Toggle Button */}
          <Button variant="outline-secondary" onClick={toggleTheme} className="ms-2">
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
