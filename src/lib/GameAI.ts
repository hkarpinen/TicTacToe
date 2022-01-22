import { GameData, GamePlayer } from "../types/Game";

// Interface for Move & Edge responses to implement. 
interface MoveResponse {
    ids: number[],
    response: number[]
}

// Corner move responses.
const MoveReponses: MoveResponse[] = [
    { ids: [1], response: [9] },
    { ids: [3], response: [7] },
    { ids: [7], response: [3] },
    { ids: [9], response: [1] }
]

// Edge winning pattern responses.
const EdgeResponses: MoveResponse[] = [
    { ids: [1, 9], response: [5] },
    { ids: [3, 7], response: [5] },
    { ids: [1, 2], response: [3] },
    { ids: [2, 3], response: [1] },
    { ids: [4, 5], response: [6] },
    { ids: [5, 6], response: [4] },
    { ids: [7, 8], response: [9] },
    { ids: [8, 9], response: [7] },
    { ids: [1, 3], response: [2] },
    { ids: [4, 6], response: [5] },
    { ids: [7, 9], response: [8] },
    { ids: [1, 7], response: [4] },
    { ids: [2, 8], response: [5] },
    { ids: [3, 9], response: [6] },
    { ids: [1, 4], response: [7] },
    { ids: [2, 5], response: [8] },
    { ids: [3, 6], response: [9] },
    { ids: [4, 7], response: [1] },
    { ids: [5, 8], response: [2] },
    { ids: [3, 9], response: [6] },
]


// Get the next position for the AI to move in. 
export const getNextPosition = (lastPosition: number, opponent: GamePlayer, data: GameData): number => {

    // Handle edge cases where we need to block the opponent from winning.
    const opponentEdges = getOppenentEdges(opponent, data);
    if(opponentEdges.length > 0) {
        return opponentEdges[0].response[0];
    }

    // Handle edge case where the AI can win the game.
    const AIEdges = getAIEdges(opponent, data);
    if(AIEdges.length > 0) {
        return AIEdges[0].response[0];
    }

    // Find a position to return when the reponse positions are taken by other players.
    const responses = MoveReponses.filter(response => response.ids.includes(lastPosition));
    if(responses.length > 0) {
        const response = responses[0];
        const empty = response.response.filter(re => data[re - 1].owner === '');
        if(empty.length > 0) {
            return empty[0];
        }
    }

    // Get empty spots in the table and use it in the case that edges and moveresponses
    // don't return a position.
    const empty = data.filter(item => item.owner === '');
    if(empty.length > 0) {
        return empty[0].id;
    }

    // Catch all if there is no return position. 
    return lastPosition;
}

// Get edge winning patterns for an opponent.
const getOppenentEdges = (opponent: GamePlayer, data: GameData) => {
    return EdgeResponses.filter(re => {
        const { ids } = re;
        return data[ids[0] - 1].owner === opponent && 
               data[ids[1] - 1].owner === opponent &&  
               data[re.response[0] - 1].owner === ''; 
    })
}

// Get edge winning patterns for the AI. 
const getAIEdges = (opponent: GamePlayer, data: GameData) => {
    const AI = opponent === 'o' ? 'x' : 'o';
    return EdgeResponses.filter(re => {
        const { ids } = re;
        return  data[ids[0] - 1].owner === AI &&
                data[ids[1] - 1].owner === AI &&
                data[re.response[0] - 1].owner === '';
    })
}
