// action types 
export const PLUS = 'PLUS';
export const MINUS = 'MINUS';

// action creators
export function add(){
    return {
        type : PLUS,
        num :1
    }
};
export function sub(){
    return{
        type : MINUS,
        num : 1
    }
};

export function male(){
  return{
    type : 'male',
    after: '先生'
  }
};

export function female(){
  return{
    type : 'female',
    after: '小姐'
  }
};