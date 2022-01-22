import React from "react";
import { Container } from "react-bootstrap";
import { BoardItemOwner } from "../types/Game";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setItemOwner, setWinner } from '../redux/reducers/Game';
import { RootState } from "../redux/store";

interface Props {
    owner: BoardItemOwner,
    id: number,
    winningItem: boolean
}

export const GameBoardItem = (props: Props) => {
    const currentPlayer = useAppSelector((state: RootState) => state.gameBoardSlice.player.next);
    const hasWinner = useAppSelector((state: RootState) => state.gameBoardSlice.game.winner !== '');
    const activeGame = useAppSelector((state: RootState) => state.gameBoardSlice.game.active);
    const dispatch = useAppDispatch();

    if(!activeGame) {
        return <Container className="game-board-item">
            <p>{props.owner.toUpperCase()}</p>
        </Container>
    }

    if(props.winningItem) {
        return <Container className="game-board-item">
            <p style={{ color: '#90EE90' }}>{props.owner.toUpperCase()}</p>
        </Container>
    }

    if(hasWinner) {
        return <Container className="game-board-item">
            <p>{props.owner.toUpperCase()}</p>
        </Container>
    }

    return <Container className="game-board-item" onClick={() => {
        // only update the owner if it's not taken.
        if(props.owner === '') {
            dispatch(setItemOwner([props.id, currentPlayer]));
            dispatch(setWinner());
        }
    }}>
        <p>{props.owner.toUpperCase()}</p>
    </Container>
}