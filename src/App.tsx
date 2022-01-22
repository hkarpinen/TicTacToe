import React from "react";
import { Row, Col } from "react-bootstrap";
import { NavBar } from "./components/NavBar";
import { Game } from './components/Game';

export const App = () => {
    return <Col id='app'>
        <Row><NavBar /></Row>
        <Row id='game-row'><Game /></Row>
    </Col>
}