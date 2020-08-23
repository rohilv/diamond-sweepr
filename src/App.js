import React, {useEffect, useState} from 'react';
import './assets/styles/App.scss';
import {ATTEMPTS, DIAMONDS, SIZE} from "./settings";
import BlockItem from "./Components/BlockItem";
import {Col, Container, Row} from "react-bootstrap";
import GameOver from "./Components/GameOver";

//Initialize Diamond Array
let diamondPositions = [];

function App() {
    //Initialize Variables
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(ATTEMPTS);
    const [foundAllDiamond, setFoundAllDiamond] = useState(false);

    useEffect(() => {
        //Call generateDiamond on Component load
        generateDiamonds();
    }, [])

    // Function to Generate Random Diamond positions
    const generateDiamonds = () => {
        console.log("#### DIAMONDS ARE AT ####")
        while (diamondPositions.length < DIAMONDS) {
            let r = Math.floor(Math.random() * SIZE);
            let c = Math.floor(Math.random() * SIZE);
            if (diamondPositions.findIndex(pos => pos.r === r && pos.c === c) === -1) {
                console.log(r, c)
                diamondPositions.push({r, c});
            }
        }
        console.log('-------------------------')
    }

    function _decrementCounter() {

        setScore(score - 1);

        if (score === 1) {
            setGameOver(true);
            const prevScore = parseInt(localStorage.getItem('highScore')) || 0;
            if (prevScore < score)
                localStorage.setItem('highScore', String(score - 1));
        }
    }

    function _removeRevealedDiamondArray(row, col) {
        // console.log('removing diamond from array:', row,col)
        diamondPositions.splice(
            diamondPositions.findIndex(diamond => diamond.r === row && diamond.c === col),
            1
        );
        // console.log(diamondPositions, diamondPositions.length)
        if (diamondPositions.length === 0) {
            setFoundAllDiamond(true)
            const prevScore = parseInt(localStorage.getItem('highScore')) || 0;
            if (prevScore < score)
                localStorage.setItem('highScore', String(score - 1));
        }
    }

    function _renderRowElements(row) {
        let rowElements = [];
        for (let i = 0; i < SIZE; i++) {
            rowElements.push(
                <td key={i + '' + row}>
                    <BlockItem
                        row={row}
                        col={i}
                        diamondPositions={diamondPositions}
                        removeDiamondFromArray={() =>
                            _removeRevealedDiamondArray(row, i)
                        }
                        decrementCounter={() => _decrementCounter()}
                    />
                </td>
            );
        }
        return rowElements;
    }

    function _renderRows() {
        let row = [];
        for (let i = 0; i < SIZE; i++) {
            row.push(<tr key={i}>{_renderRowElements(i)}</tr>);
        }
        return row;
    }

    function _renderTable() {
        return (
            <div>
                <table className="table-board diamondsweeper-board">
                    <tbody>{_renderRows()}</tbody>
                </table>
            </div>
        );
    }

    return (
        <Container className="App">
            <Row>
                <header className="App-header">
                    Diamond Sweeper
                </header>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6} lg={9}>
                    {gameOver || foundAllDiamond
                        ?
                        <GameOver gameOver={gameOver} score={score} foundAllDia={foundAllDiamond}/>
                        :
                        _renderTable()
                    }
                </Col>
                <Col xs={12} md={6} lg={3}>
                    <div className="score-board">
                        <p>
                            Your High Score: {localStorage.getItem('highScore') || 0}
                        </p>

                        <p>
                            Diamonds Left: {diamondPositions.length}
                        </p>

                        <p>Your score: {score}</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default App