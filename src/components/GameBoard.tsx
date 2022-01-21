import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Container } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../redux/store';
import '../css/Game.css';
import { GameData } from '../types/Game';
import { GameBoardRow } from './BoardRow';

const mapState = (state: RootState) => ({
    data: state.gameBoardSlice.data
})

const connector = connect(mapState);
type ReduxProps = ConnectedProps<typeof connector>
interface Props extends ReduxProps {
    data: GameData
}

const GameBoard = (props: Props) => {
    const { data } = props;
    return <Container id='game-board'>
        <GameBoardRow items={[
            data[0], data[1], data[2]
        ]} />
        <GameBoardRow items={[
            data[3], data[4], data[5]
        ]} />
        <GameBoardRow items={[
            data[6], data[7], data[8]
        ]} />
    </Container>
}

export default connector(GameBoard);