import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaDog } from "react-icons/fa"; // Importing dog icon
import SignupButton from "./SignupButton";
import Cart from "./Cart"; // Importing Cart component
import './Header.css'; // Ensure this file includes your custom CSS

function Header() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Navbar className={`navbar-custom ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`} expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Purrrfect <FaDog size={24} className="dog-logo" /></Navbar.Brand>
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
              <Form.Control type="search" placeholder="Search" aria-label="Search" />
              <Button className="search-button">Search</Button>
            </Form>
          </div>
          <div className="signup-button-container">
            <SignupButton className="custom-signup-button" />
          </div>
          <Cart /> {/* Using the Cart component here */}
          <div className="theme-toggle">
            <label className="switch">
              <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
              <span className="slider round"></span>
            </label>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
