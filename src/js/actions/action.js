// action types 
export const PLUS = 'PLUS';
export const MINUS = 'MINUS';

// action creators
export function refreshPost(data){
	for(var i = 0, len = data.length; i < len; i++){
		data[i].img = data[i].img.replace('%', ',');
		//console.log(data[i].text);
	}
	return {
		type: 'refreshPost',
		postArr: data
	}
}

export function getFbMemberInfo(data){
	return {
		type: 'getFbMemberInfo',
		name: data.name,
		picture: data.picture.data.url
	}
}