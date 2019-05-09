import React,{ PropTypes ,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function BoardBody({data, refreshPost}){
	const url = 'https://script.google.com/macros/s/AKfycbx7DzxtUaMtXnpNrnuxwyCR4WiVSizyfh1d7FnsPlBK1weLhUA/exec';
	useEffect(() => {
   	getData();
  }, []);

  function getData(){
		var getPostParameter = {
   		requestAction: 'getPost'
   	}

    $.get(url, getPostParameter, function(data) {
    	console.log('get data');
		  refreshPost(data);
		  //console.log('output: '+ JSON.stringify(outputArr));
		});
	}
	function newData(){
    var postTextItem = document.getElementById('postText');
		if(postText.value){
			var data = [[new Date(), postText.value]];
			var newPostParameter = {
	      requestAction: 'newPost',
	      data: data.toString(),
	      insertType: 'bottom',
	      row:data.length,
	      column:data[0].length
	    }

	    $.get(url, newPostParameter, function(data) {
	    	console.log('get data');
			  refreshPost(data);
			  postText.value = '';
			  //console.log('output: '+ JSON.stringify(outputArr));
			});
	  }
	  else {
	  	postTextItem.focus(function(event) {
	  		/* Act on the event */
	  	});
	  }
	}
  return(
    <div>
      <div>{data.memberName}</div>
      <div className="row pb-4">
      {data.postData 
      	? (data.postData.map((postItem, i) => 
      		<div className="col-md-3 col-sm-6 col-12" key={'post_item_' + i}>{postItem.text}</div>)) 
      	: '沒有貼文可以顯示'}
      </div>
      <div className="form-group pt-3 mt-4 border-top">
      	<div>
	      	<textarea className="form-control" name="postText" id="postText"></textarea>
	      </div>
	      <div className="text-right pt-2">
	      	<button className="btn btn-primary" type="button" onClick={newData}>送出新貼文</button>
	      </div>
	    </div>
    </div>
  );
}

export default BoardBody;