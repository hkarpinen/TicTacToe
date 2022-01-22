import { BoardItemOwner, GameData } from "../types/Game";
import { BoardItem } from "../types/Game";

// Object typing for win detection.
export type WinPattern = [number, number, number];
export type PatternResult = WinPattern | undefined;
type WinnerResult = [BoardItemOwner, PatternResult];

// All winning patterns.
const WinPatterns: WinPattern[] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]

/* Check if a player has won the game.
1. Iterate each winning pattern.
2. If all the items in a winning pattern have the same player as their owner, 
the game has been won.
3. Return the winner, if there is no winner, return undefined.  
*/
export const getWinner = (data: GameData): WinnerResult => {
    let winner: WinnerResult = ['', undefined];
    WinPatterns.forEach(pattern => {
        const items = getItems(pattern, data);
        if(itemsShareOwner('x', items)) {
            winner = [<BoardItemOwner>'x', pattern];
            return;
        }
        if(itemsShareOwner('o', items)) {
            winner = [<BoardItemOwner>'o', pattern];
            return;
        }
    });
    return winner;
}

// Check if BoardRowItems share an owner. 
export const itemsShareOwner = (owner: BoardItemOwner, items: BoardItem[]) => {
    return items.filter(item => item.owner !== owner).length === 0;
}


// Get BoardRowItems using a number range. 
const getItems = (items: number[], data: GameData) => {
    const targetItems: BoardItem[] = [];
    data.forEach(item => {
        if(items.includes(item.id)) {
            targetItems.push(item);
        }
    })
    return targetItems;
}