import React from "react";
import { Container, Button } from "react-bootstrap";
import GameMode from "./GameMode";
import GamePlayer from "./GamePlayer";
import { useAppDispatch } from "../redux/hooks";
import { setActiveGame, resetBoard } from "../redux/reducers/Game";

export const GameControls = () => {
    const dispatch = useAppDispatch();
    return <Container fluid id='game-controls' className="flex-xs-column flex-md-column flex-xl-row">
        <GameMode />
        <GamePlayer />
        <Button onClick={() => dispatch(setActiveGame(true))}>Start</Button>
        <Button onClick={() => dispatch(resetBoard())}>Reset</Button>
    </Container>
}