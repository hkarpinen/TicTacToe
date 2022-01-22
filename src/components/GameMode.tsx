import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from "../redux/store";
import { GameMode } from "../types/Game";
import { useAppDispatch } from "../redux/hooks";
import { setGameMode } from "../redux/reducers/Game";

const mapState = (state: RootState) => ({
    gameMode: state.gameBoardSlice.game.mode,
    activeGame: state.gameBoardSlice.game.active
})

const connector = connect(mapState);
type ReduxProps = ConnectedProps<typeof connector>
interface Props extends ReduxProps {
    gameMode: GameMode
}

const GameModeDropdown = (props: Props) => {
    const dispatch = useAppDispatch();
    // If there is an active game, disabled the dropdown.
    if(props.activeGame) {
        return  <DropdownButton id="game-mode" title={props.gameMode.toUpperCase()} disabled>
            <Dropdown.Item>AI</Dropdown.Item>
        </DropdownButton>
    }

    // If the gamemode is changed to AI, update the state. 
    if(props.gameMode === 'friend') {
        return  <DropdownButton id="game-mode" title="Friend">
            <Dropdown.Item onClick={() => dispatch(setGameMode('ai'))}>AI</Dropdown.Item>
        </DropdownButton>
    }

    // If the gamemode is changed to friend, update the state. 
    return  <DropdownButton id="game-mode" title="AI">
                <Dropdown.Item onClick={() => dispatch(setGameMode('friend'))}>Friend</Dropdown.Item>
            </DropdownButton>
}

export default connector(GameModeDropdown);