import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameData, GamePlayer, BoardItemUpdate, BoardItemOwner, GameMode } from '../../types/Game';
import { getWinner } from '../../lib/GameInspector';
import { getNextPosition } from '../../lib/GameAI';

interface GameBoardState {
    player: {
        next: GamePlayer,
        selected: GamePlayer
    },
    game: {
        data: GameData,
        winner: BoardItemOwner,
        active: boolean,
        mode: GameMode,
        lastMove: number
    }
}

const initialState: GameBoardState = {
    player: {
        next: 'x',
        selected: 'x'
    },
    game: {
        data: [
            { owner: '', id: 1, winningItem: false },
            { owner: '', id: 2, winningItem: false },
            { owner: '', id: 3, winningItem: false },
            { owner: '', id: 4, winningItem: false },
            { owner: '', id: 5, winningItem: false},
            { owner: '', id: 6, winningItem: false },
            { owner: '', id: 7, winningItem: false },
            { owner: '', id: 8, winningItem: false },
            { owner: '', id: 9, winningItem: false }
        ],
        winner: '',
        active: false,
        mode: 'friend',
        lastMove: -1
    }
}

export const gameBoardSlice = createSlice({
    name: 'gameBoard',
    initialState,
    reducers: {
        setItemOwner: (state, action: PayloadAction<BoardItemUpdate>) => {
            const item = state.game.data[action.payload[0] - 1];
            state.game.lastMove = action.payload[0];
            item.owner = state.player.next;
            if(state.game.mode === 'friend') {
                state.player.next = action.payload[1] === 'o' ? 'x' : 'o';
            }

            if(state.game.mode === 'ai') {
                const nextPosition = getNextPosition(state.game.lastMove, state.player.next , state.game.data);
                state.game.data[nextPosition - 1].owner = state.player.next === 'x' ? 'o' : 'x';
                state.game.lastMove = nextPosition;
            }
        },
        setNextPlayer: (state, action: PayloadAction<GamePlayer>) => {
            state.player.next = action.payload;
        },
        setWinner: (state) => {
            const winner = getWinner(state.game.data);
            if(winner[1] !== undefined) {
                state.game.winner = winner[0];
                state.game.data.forEach(item => {
                    if(winner[1]?.includes(item.id)) {
                        item.winningItem = true;
                    }
                })
            }
        },
        setSelectedPlayer: (state, action: PayloadAction<GamePlayer>) => {
            state.player.selected = action.payload;
            state.player.next = action.payload;
        },
        setActiveGame: (state, action: PayloadAction<boolean>) => {
            state.game.active = action.payload;
        },
        setGameMode: (state, action: PayloadAction<GameMode>) => {
            state.game.mode = action.payload;
        },
        resetBoard: (state) => {
            state.game.data = initialState.game.data;
            state.game.winner = initialState.game.winner;
            state.game.active = initialState.game.active;
        }
    }
})

export const { setItemOwner, setNextPlayer, setWinner, setActiveGame, 
    setGameMode, setSelectedPlayer, resetBoard } = gameBoardSlice.actions
export default gameBoardSlice.reducer
