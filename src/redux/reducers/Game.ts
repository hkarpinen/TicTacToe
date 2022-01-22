import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameData, GamePlayer, BoardItemUpdate, BoardItemOwner, GameMode } from '../../types/Game';
import { getWinner } from '../../lib/GameInspector';
import { getNextPosition } from '../../lib/GameAI';

interface GameBoardState {
    // Store player data.
    player: {
        next: GamePlayer,
        selected: GamePlayer
    },
    // Store game data / variables. 
    game: {
        data: GameData,
        winner: BoardItemOwner,
        active: boolean,
        mode: GameMode,
        lastMove: number
    }
}

// Initial State for the game board. 
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

// Export gameBoardSlice. 
export const gameBoardSlice = createSlice({
    name: 'gameBoard',
    initialState,
    reducers: {
        setItemOwner: (state, action: PayloadAction<BoardItemUpdate>) => {
            /* Set item data
            1. Get the item from the game data.
            2. Set the last move position.
            3. Set the owner of the item to the player that selected it.
            */
            const item = state.game.data[action.payload[0] - 1];
            state.game.lastMove = action.payload[0];
            item.owner = state.player.next;

            // Only use a ternary for the next player if they are playing with a friend. 
            if(state.game.mode === 'friend') {
                state.player.next = action.payload[1] === 'o' ? 'x' : 'o';
            }

            /*  Process of playing against the AI. 
            1. Get the position of the next move the AI will make.
            2. Check if there is a winner, do not move if there is.
            3. Check if there is only one open spot left in the game data.
            If there is, then we will want to have the selected player make the move.
            If there isn't, use the ternary operator to assign the owner of the item. 
            */
            if(state.game.mode === 'ai') {
                const nextPosition = getNextPosition(state.game.lastMove, state.player.next , state.game.data);
                if(state.game.winner === '') {
                    if(state.game.data.filter(item => item.owner === '').length > 1) {
                        state.game.data[nextPosition - 1].owner = state.player.next === 'x' ? 'o' : 'x';
                    }else{
                        state.game.data[nextPosition - 1].owner = state.player.selected;
                    }
                }
            }
        },
        // Sets the next player to make a move. 
        setNextPlayer: (state, action: PayloadAction<GamePlayer>) => {
            state.player.next = action.payload;
        },
        /* Set the winner of the game.
        1. Get a response from the getWinner method.
        2. Check if the winner is undefined. Undefined means there is no winner.
        3. Set the winner of the game.
        4. Highlight winning pattern.
        */
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
        // Set the selected and next player equal to the user selection.
        setSelectedPlayer: (state, action: PayloadAction<GamePlayer>) => {
            state.player.selected = action.payload;
            state.player.next = action.payload;
        },
        // Start a new game.
        setActiveGame: (state, action: PayloadAction<boolean>) => {
            state.game.active = action.payload;
        },
        // Set the mode for the game (AI or Friend)
        setGameMode: (state, action: PayloadAction<GameMode>) => {
            state.game.mode = action.payload;
        },
        // Reset the board to it's initial state.
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
