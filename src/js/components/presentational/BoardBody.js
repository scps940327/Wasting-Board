import React,{ PropTypes } from 'react';
import ReactDOM from 'react-dom';

function BoardBody({value, onClickMale, onClickFemale}){
  return(
    <div>
      <div>{value}</div>
    </div>
  );
}

export default BoardBody;