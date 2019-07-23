import React from 'react';

const ControlButtons = (props) => {
    return (
        <div>
            <button onClick={props.startClick}> Start </button>
            <button onClick={props.pauseFunc}> Pause&Play </button> 
            <button onClick={props.resetFunc}> Reset </button>
        </div>
    );
}

export default ControlButtons