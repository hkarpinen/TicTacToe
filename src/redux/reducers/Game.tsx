import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameData, GamePlayer, BoardItemUpdate, BoardItemOwner } from '../../types/Game';
import { getWinner } from '../../lib/GameInspector';

interface GameBoardState {
    player: GamePlayer,
    data: GameData,
    winner: BoardItemOwner
}

const initialState: GameBoardState = {
    player: 'o',
    data: [
        { owner: '', id: 1 },
        { owner: '', id: 2 },
        { owner: '', id: 3 },
        { owner: '', id: 4 },
        { owner: '', id: 5 },
        { owner: '', id: 6 },
        { owner: '', id: 7 },
        { owner: '', id: 8 },
        { owner: '', id: 9 }
    ],
    winner: ''
}

export const gameBoardSlice = createSlice({
    name: 'gameBoard',
    initialState,
    reducers: {
        setItemOwner: (state, action: PayloadAction<BoardItemUpdate>) => {
            const item = state.data.filter(i => i.id === action.payload[0])[0];
            item.owner = action.payload[1];
        },
        setCurrentPlayer: (state, action: PayloadAction<GamePlayer>) => {
            state.player = action.payload;
        },
        setWinner: (state) => {
            state.winner = getWinner(state.data);
        }
    }
})

// eslint-disable-next-line no-empty-pattern
export const { setItemOwner, setCurrentPlayer, setWinner } = gameBoardSlice.actions
export default gameBoardSlice.reducer
