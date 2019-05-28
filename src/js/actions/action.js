// action types 
export const PLUS = 'PLUS';
export const MINUS = 'MINUS';

// action creators
export function refreshPost(data, dataType){
	if(dataType && dataType.indexOf('new') != -1){
		data[0].img = data[0].img.replace('%', ',');

		return {
			type: 'newPost',
			postArr: data[0]
		}
	}

	for(var i = 0, len = data.length; i < len; i++){
		data[i].img = data[i].img.replace('%', ',');
		//console.log(data[i].text);
	}
	return {
		type: 'loadPost',
		postArr: data
	}
}

export function setFbMemberInfo(data){
	return {
		type: 'setFbMemberInfo',
		name: data.name,
		picture: data.picture,
		status: data.status
	}
}