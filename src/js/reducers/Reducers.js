import { combineReducers } from 'redux';

const initialData = {
  member:{
    status: 'new',
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
    case 'getFbMemberInfo' :
      return Object.assign({},state,{
        member: {
          status: 'fb',
          name: action.name,
          picture: action.picture
        }
      });
    default:
      return state;
  }
}

const calculatorApp = combineReducers({
  Control
});

export default calculatorApp;