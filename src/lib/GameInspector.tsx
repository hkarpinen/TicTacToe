import { BoardItemOwner, GameData } from "../types/Game";
import { BoardItem } from "../types/Game";

type WinPattern = [number, number, number];

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

export const getWinner = (data: GameData): BoardItemOwner => {
    let winner: BoardItemOwner = '';
    WinPatterns.forEach(pattern => {
        const items = getItems(pattern, data);
        console.table(items);

        if(itemsShareOwner('x', items)) {
            winner = 'x';
            return;
        }
        if(itemsShareOwner('o', items)) {
            winner = 'o';
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