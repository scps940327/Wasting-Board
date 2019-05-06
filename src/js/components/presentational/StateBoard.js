import React,{ PropTypes } from 'react';
import ReactDOM from 'react-dom';


function StateBoard({value, onClickAdd, onClickSub}){
    return(
        <div>
            <h1>{value}</h1>
            <button onClick={() => onClickAdd()}>+1</button>
            <button onClick={() => onClickSub()}>-1</button>
        </div>
    );
}

export default StateBoard;