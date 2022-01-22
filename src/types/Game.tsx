export interface Gameboard {
    rows: BoardRows
}

export interface BoardRow {
    items: BoardRowItems
}

export interface BoardItem {
    owner: BoardItemOwner
    id: number,
    winningItem: boolean
}

export type GameMode = 'friend' | 'ai';
export type BoardRows = [BoardRow, BoardRow, BoardRow];
export type BoardRowItems = [BoardItem, BoardItem, BoardItem];
export type BoardItemOwner = GamePlayer | '';
export type GamePlayer = 'o' | 'x';
export type BoardItemUpdate = [number, GamePlayer];
export type GameData = [
    BoardItem, BoardItem, BoardItem,
    BoardItem, BoardItem, BoardItem,
    BoardItem, BoardItem, BoardItem
]