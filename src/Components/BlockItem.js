import React, {useState} from 'react';
import '../assets/styles/tableItem.css';
import diamond from '../assets/images/diamond.png';
import question from '../assets/images/question.png';

function BlockItem(props) {

    const [pressed, setPressed] = useState(false)
    const [isDiamond, setIsDiamond] = useState(false)

    /*
    * @description: Function to handle the click on each element and reveal if its a diamond or blank space
    * */
    function _handleItemClick() {
        setPressed(true);
        document.getElementById(`button${props.row}${props.col}`).className = 'button-rotate';
        props.decrementCounter();

        if (props.diamondPositions.findIndex(pos => pos.r === props.row && pos.c === props.col) !== -1) {
            console.log('Wohoo!! Found a diamond at', props.row, props.col);
            setIsDiamond(true)
            props.removeDiamondFromArray();
        } else {
            setIsDiamond(false)
        }

    }

    /*
    * @description: Handle rendering of element items
    * */
    if (pressed) {

        // If the element is clicked
        if (isDiamond) {
            // If it is a  Diamond
            return (
                <div className="display-value-diamond">
                    <img src={diamond} className="images" alt="diamond"/>
                </div>
            );
        } else {
            // If it is blank space
            return <div>
                <div className='images'>&nbsp;</div>
            </div>
        }
    }
    // Default : Render with Question mark
    return (
        <button
            className="button"
            id={`button${props.row}${props.col}`}
            style={{
                background:
                    (props.row % 2 === 0 && props.col % 2 === 1) ||
                    (props.row % 2 === 1 && props.col % 2 === 0)
                        ? '#e14504'
                        : '#c00c00'
            }}
            onClick={() => _handleItemClick()}
        >
            <img
                src={question}
                className="images"
                alt="question"
                style={{opacity: 0.4}}
            />
        </button>
    );
}

export default BlockItem;
