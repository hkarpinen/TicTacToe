import React from "react";
import { Container } from "react-bootstrap";
import GameTurn from './GameTurn';
import { GameControls } from "./GameControls";

export const GameHeader = () => {
    return <Container id='game-header'>
        <GameTurn />
        <GameControls />
    </Container>
}