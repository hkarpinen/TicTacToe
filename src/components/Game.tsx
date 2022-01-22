import React from "react";
import { Container } from "react-bootstrap"; 
import GameBoard from "./GameBoard";
import { GameHeader } from "./GameHeader";

export const Game = () => {
    return <Container id='game' fluid className="flex-column flex-sm-row flex-md-column flex-lg-row">
        <GameHeader />
        <GameBoard />
    </Container>
}