import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";

function GameOver(props) {
    const [show, setShow] = useState(props.gameOver || props.foundAllDia)
    const {gameOver, score} = props
    const _handleClose = () => {
        setShow(false)
    }
    const _newGame = () => {
       window.location.reload()
    }

    return (

        <Modal show={show} onHide={_handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{gameOver ? `Game Over` : `Congratulations! You have found all the diamonds.`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                    <p className="score-text-game-over">Your score: {score}</p>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={_handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={_newGame}>
                    New Game
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default GameOver;