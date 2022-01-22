import React from "react";
import { Col } from "react-bootstrap"; 
import GameBoard from "./GameBoard";
import { GameHeader } from "./GameHeader";

export const Game = () => {
    return <Col id='game' className="flex-column flex-sm-row flex-md-column flex-lg-row">
        <GameHeader />
        <GameBoard />
    </Col>
}