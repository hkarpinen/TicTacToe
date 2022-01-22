import React from "react";
import { Container, Navbar, Nav } from 'react-bootstrap';
import '../css/Navbar.css';

export const NavBar = () => {
    return <Navbar bg="light" expand="lg" id='top-nav-bar'>
        <Container fluid>
            <Navbar.Brand>Kuolintoive-Games</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="#home">TicTacToe</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
  </Navbar>
}