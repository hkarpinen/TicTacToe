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

// Individual items on the board. 
export const GameBoardItem = (props: Props) => {
    const currentPlayer = useAppSelector((state: RootState) => state.gameBoardSlice.player.next);
    const hasWinner = useAppSelector((state: RootState) => state.gameBoardSlice.game.winner !== '');
    const activeGame = useAppSelector((state: RootState) => state.gameBoardSlice.game.active);
    const dispatch = useAppDispatch();

    // Check if there is active game. Return a container without the onClick method.
    // This is to not allow players to play when there isn't an active game.
    if(!activeGame) {
        return <Container className="game-board-item">
            <p>{props.owner.toUpperCase()}</p>
        </Container>
    }

    // Highlight the item if it's a winning item.
    if(props.winningItem) {
        return <Container className="game-board-item">
            <p style={{ color: '#90EE90' }}>{props.owner.toUpperCase()}</p>
        </Container>
    }

    // If the game has a winner, disable the item from being clicked.
    if(hasWinner) {
        return <Container className="game-board-item">
            <p>{props.owner.toUpperCase()}</p>
        </Container>
    }

    // The game is active and the item is selectable. 
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