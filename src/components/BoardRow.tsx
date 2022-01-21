import React from "react";
import { Container } from 'react-bootstrap';
import { BoardRowItems } from "../types/Game";
import { GameBoardItem } from './BoardItem';

interface Props {
    items: BoardRowItems
}

export const GameBoardRow = (props: Props) => {
    return <Container className="game-board-row">
        {props.items.map(item => {
            return <GameBoardItem owner={item.owner} id={item.id} key={item.id} />
        })}
    </Container>
}