import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";

function GameOver(props) {
    const [show, setShow] = useState(props.gameOver || props.foundAllDia)
    const {gameOver, score} = props
    const handleClose = () => {
        console.log('close modal')
        setShow(false)
    }
    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="game-over-content">
                    <span className="game-over-text">
                      {gameOver ? `Game Over` : `Congratulations! You have found all the diamonds.`}
                    </span>
                    <p className="score-text-game-over">Your score: {score}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    New Game
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default GameOver;