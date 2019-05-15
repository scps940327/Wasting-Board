import { combineReducers } from 'redux';
import { PLUS, MINUS } from '../actions/action.js';

// const initialData = {
//   value : 0
// }

const initialData = {
  member:{
    name: '訪客'
  },
  postItem: []
}

function Control(state = initialData, action){
  switch(action.type){
    case 'refreshPost' :
      return Object.assign({},state,{
        postItem: action.postArr
      });
    default:
      return state;
  }
}

const calculatorApp = combineReducers({
  Control
});

export default calculatorApp;