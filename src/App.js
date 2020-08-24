import React, {useEffect, useState} from 'react';
import {Col, Container, Jumbotron, Row} from "react-bootstrap";
import './assets/styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ATTEMPTS, DIAMONDS, SIZE} from "./settings";
import BlockItem from "./Components/BlockItem";
import GameOver from "./Components/GameOver";

let diamondPositions = [];

function App() {
    //Initialize Variables
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(ATTEMPTS);
    const [foundAllDiamond, setFoundAllDiamond] = useState(false);

    useEffect(() => {
        //One-time call to Generate Diamond positions on Component load
        generateDiamonds();
    }, [])

    /*
    * @description: Function to Generate Random Diamond positions
    * */
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

    /*
    * @description: Function to Decrement score on each click/ attempt. Also store the high-score in local storage for comparison
    * */
    function _decrementCounter() {
        setScore(score - 1);
        if (score === 1) {
            setGameOver(true);
            const prevScore = parseInt(localStorage.getItem('highScore')) || 0;
            if (prevScore < score)
                localStorage.setItem('highScore', String(score - 1));
        }
    }

    /*
    * @description: Function to remove Diamonds from the Diamond Position array when a correct diamond is found
    * */
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

    /*
    * @description: Function to render each block elements of the row
    * */
    function _renderRowElements(row) {
        let rowElements = [];
        for (let c = 0; c < SIZE; c++) {
            rowElements.push(
                <td key={c + '' + row}>
                    <BlockItem
                        row={row}
                        col={c}
                        diamondPositions={diamondPositions}
                        removeDiamondFromArray={() =>
                            _removeRevealedDiamondArray(row, c)
                        }
                        decrementCounter={() => _decrementCounter()}
                    />
                </td>
            );
        }
        return rowElements;
    }

    /*
    * @description: Function to render each row of the grid
    * */
    function _renderRows() {
        let row = [];
        for (let i = 0; i < SIZE; i++) {
            row.push(<tr key={i}>{_renderRowElements(i)}</tr>);
        }
        return row;
    }

    /*
    * @description: Function to render the Table / Board Layout
    * */
    function _renderTable() {
        return (
            <table className="diamondSweeper-board">
                <tbody>{_renderRows()}</tbody>
            </table>
        );
    }

    return (
        /*
        * @description: Basic skeleton structure of the page
        * */
        <Container fluid className='App min-vh-100'>
            <Row>
                <Col>
                    <header className="App-header">
                        Diamond Sweeper
                    </header>
                </Col>
            </Row>
            <Row
                xs={1} sm={1} md={3} lg={3} xl={4}
                className="justify-content-around align-content-center content">
                <Col md={9} lg={9}>
                    {gameOver || foundAllDiamond
                        ?
                        <GameOver gameOver={gameOver} score={score} foundAllDia={foundAllDiamond}/>
                        :
                        _renderTable()
                    }
                </Col>
                <Col xs={12} md={3} lg={3}>
                    <Jumbotron>
                        <div className="score-board">
                            <h3 style={{display: "inline-flex", alignItems: "center"}}>
                                <img src={require('./assets/images/diamond.png')} alt='diamond' height={50} width={50}/>
                                <small className='text-uppercase'>left: </small>
                                &nbsp;{diamondPositions.length}
                            </h3>

                            <h3><small className='text-uppercase'>Attempts:</small> {score}</h3>
                            <h3><small
                                className='text-uppercase'>HighScore: </small>{localStorage.getItem('highScore') || 0}
                            </h3>
                        </div>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    )
}

export default App