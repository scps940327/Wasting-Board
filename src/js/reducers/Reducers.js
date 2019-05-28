import { combineReducers } from 'redux';

const initialData = {
  member:{
    status: 'new',
    name: '訪客'
  },
  postItem: [],
  pageState: 'initial'
}

function Control(state = initialData, action){
  switch(action.type){
    case 'loadPost' :
      let nowPostItem = state.postItem.slice(0);

      action.postArr.map((item) => {
        nowPostItem.push(item);
      })
      return Object.assign({},state,{
        postItem: nowPostItem,
        pageState: 'loaded'
      });
    case 'newPost' :
      nowPostItem = state.postItem.slice(0);
      nowPostItem.unshift(action.postArr);
      console.log(nowPostItem);
      return Object.assign({},state,{
        postItem: nowPostItem,
        pageState: 'loaded'
      });
    case 'setFbMemberInfo' :
      return Object.assign({},state,{
        member: {
          status: action.status,
          name: action.name,
          picture: action.picture,
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