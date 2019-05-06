import { combineReducers } from 'redux';
import { PLUS, MINUS } from '../actions/action.js';

// const initialData = {
//   value : 0
// }

const initialMemberData = {
  name: '訪客'
}

function calculator(state = initialData, action){
  switch(action.type){
    case PLUS:
        return Object.assign({},state,{
            value : state.value + action.num
        });
    case MINUS:
        return Object.assign({},state,{
            value : state.value - action.num
        });
    default:
        return state;
  }
}

function memberControl(state = initialMemberData, action){
  switch(action.type){
    case 'female':
        return Object.assign({},state,{
            name: state.name + '小姐'
        });
    case 'male':
        return Object.assign({},state,{
            name: state.name + '先生'
        });
    default:
        return state;
  }
}

const calculatorApp = combineReducers({
  memberControl
});

export default calculatorApp;