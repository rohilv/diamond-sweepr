import React, {useState} from 'react';
import '../assets/styles/tableItem.css';
import diamond from '../assets/images/diamond.png';
import question from '../assets/images/question.png';
import arrow from '../assets/images/arrow.png';

function BlockItem(props) {
    // console.log(props)
    const [pressed, setPressed] = useState(false)
    const [isDiamond, setIsDiamond] = useState(false)

    if (pressed) {
        if (isDiamond) {
            return (
                <div className="display-value-diamond">
                    <img src={diamond} className="images" alt="diamond"/>
                </div>
            );
        } else {
            return <div>
                <img src={arrow} alt='arrow' className='images'/>
            </div>
        }
    }
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
            onClick={() => {
                setPressed(true);
                //document.getElementById(`button${props.row}${props.col}`).className = 'button-rotate';
                props.decrementCounter();
                if (props.diamondPositions.findIndex(pos => pos.r === props.row && pos.c === props.col) !== -1) {
                    console.log('Wohoo!! Found a diamond at', props.row, props.col);
                    setIsDiamond(true)
                    props.removeDiamondFromArray();
                } else {
                    setIsDiamond(false)
                }
            }}
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
