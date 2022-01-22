import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from "../redux/store";
import { GamePlayer } from "../types/Game";
import { setSelectedPlayer } from "../redux/reducers/Game";
import { useAppDispatch } from "../redux/hooks";

const mapState = (state: RootState) => ({
    activeGame: state.gameBoardSlice.game.active,
    selectedPlayer: state.gameBoardSlice.player.selected
})

const connector = connect(mapState);
type ReduxProps = ConnectedProps<typeof connector>
interface Props extends ReduxProps {
    activeGame: boolean,
    selectedPlayer: GamePlayer
}

const GamePlayerDropdown = (props: Props) => {
    const dispatch = useAppDispatch();
    // If there is an active game, disable the dropdown.
    if(props.activeGame) {
        return  <DropdownButton id="game-start-player" title={`Player: ${props.selectedPlayer.toUpperCase()}`}
        disabled={true}>
                    <Dropdown.Item>{props.selectedPlayer}</Dropdown.Item>
                </DropdownButton>
    }

    // If the player is changed to O, update the state. 
    if(props.selectedPlayer === 'x') {
        return  <DropdownButton id="game-start-player" title={`Player: ${props.selectedPlayer.toUpperCase()}`}>
                <Dropdown.Item onClick={() => dispatch(setSelectedPlayer('o'))}>O</Dropdown.Item>
            </DropdownButton>
    }

    // If the player is changed to X, update the state. 
    return  <DropdownButton id="game-start-player" title={`Player: ${props.selectedPlayer.toUpperCase()}`}>
                <Dropdown.Item onClick={() => dispatch(setSelectedPlayer('x'))}>X</Dropdown.Item>
            </DropdownButton>
}

export default connector(GamePlayerDropdown);