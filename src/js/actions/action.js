// action types 
export const PLUS = 'PLUS';
export const MINUS = 'MINUS';

// action creators
export function refreshPost(data){
	return {
		type: 'refreshPost',
		postArr: data
	}
}