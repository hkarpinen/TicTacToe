import React from "react";
import { Container } from "react-bootstrap";
import { BoardItemOwner } from "../types/Game";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setItemOwner, setCurrentPlayer, setWinner } from '../redux/reducers/Game';
import { RootState } from "../redux/store";

interface Props {
    owner: BoardItemOwner,
    id: number
}

export const GameBoardItem = (props: Props) => {
    const currentPlayer = useAppSelector((state: RootState) => state.gameBoardSlice.player);
    const dispatch = useAppDispatch();
    return <Container className="game-board-item" onClick={() => {
        // only update the owner if it's not taken.
        if(props.owner === '') {
            dispatch(setItemOwner([props.id, currentPlayer]));
            const nextPlayer = currentPlayer === 'o' ? 'x' : 'o';
            dispatch(setCurrentPlayer(nextPlayer));
            dispatch(setWinner());
        }
    }}>
        <p>{props.owner.toUpperCase()}</p>
    </Container>
}