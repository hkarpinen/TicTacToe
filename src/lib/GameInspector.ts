import { BoardItemOwner, GameData } from "../types/Game";
import { BoardItem } from "../types/Game";

export type WinPattern = [number, number, number];
export type PatternResult = WinPattern | undefined;

type WinnerResult = [BoardItemOwner, PatternResult];

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

export const itemsShareOwner = (owner: BoardItemOwner, items: BoardItem[]) => {
    return items.filter(item => item.owner !== owner).length === 0;
}

const getItems = (items: number[], data: GameData) => {
    const targetItems: BoardItem[] = [];
    data.forEach(item => {
        if(items.includes(item.id)) {
            targetItems.push(item);
        }
    })
    return targetItems;
}