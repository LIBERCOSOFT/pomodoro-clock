import React from 'react';

const SelectButtons = (props) => {
    return (
        <div>
            <div className="break-buttons"> 
            <h1> Break Length </h1>
                <button onClick={props.breakDec}> &dArr; </button>
                <h2> {props.break} </h2>
                <button onClick={props.breakInc}> &uArr; </button>
            </div>

            <div className="session-buttons">
            <h1>Session Length</h1>
                <button onClick={props.decreaseFunc}> &dArr; </button>
                <h2> {props.buttonMinutes} </h2>
                <button onClick={props.increaseFunc}> &uArr; </button>
            </div>
        </div>
    );
}

export default SelectButtons