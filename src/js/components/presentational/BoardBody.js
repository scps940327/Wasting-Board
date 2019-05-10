import React,{ PropTypes ,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import BoardWrapper from './BoardWrapper.js'
import { Get } from 'react-axios';

function BoardBody({data, refreshPost}){
	const url = 'https://script.google.com/macros/s/AKfycbwL7q7ayTChs2w2fg3ld8tenRmTllXWsuNEv_VF9srrOlVBV9Ve/exec';
	useEffect(() => {
   	getData();
  }, []);

  function getData(){
		var getPostParameter = {
   		requestAction: 'getPost'
   	}

   // 	$.get(url, getPostParameter, function(data) {
	  //   	console.log(data);
			//   refreshPost(data.reverse());
			// });

		$.ajax({
		  url: url,
		  data: getPostParameter,
		  success: function(data) {
				console.log(data);
				refreshPost(data.reverse());
			  },
			cache: false
		});
	}
	function newData(){
    var postTextItem = document.getElementById('postText');
    var postImgItem = document.getElementById('postImg');
    var postImgPreviewDiv = document.getElementById('previewImgDiv');
    var postImgItemData = '';

		if(postTextItem.value){
			if(postImgPreviewDiv.src.indexOf(location.href) == -1){
				postImgItemData = postImgPreviewDiv.src.replace(',', '%');
			}

			//var data = [[new Date(), postTextItem.value]];
			var newPostParameter = {
		      requestAction: 'newPost',
		      dataTime: new Date(),
		      data: postTextItem.value,
		      dataImg: postImgItemData,
		      insertType: 'bottom',
		      row: 1,
		      column: 3
	    }
	    console.log('send: ' + data.toString());

	    $.get(url, newPostParameter, function(data) {
	    	console.log('get data');
	    	console.log(data);
			  refreshPost(data.reverse());
			  postText.value = '';
			  postImgItem.value = '';
			  postImgPreviewDiv.src = '';
			  //console.log('output: '+ JSON.stringify(outputArr));
			});
	  }
	  else {
	  	postTextItem.focus();
	  }
	}
	function previewImg(){
		var postImgItem = document.getElementById('postImg');

		if(postImgItem.files && postImgItem.files[0]){
	    var reader = new FileReader();
	    reader.onload = function (e) {
	      $("#previewImgDiv").attr('src', e.target.result);
	    }
	    reader.readAsDataURL(postImgItem.files[0]);
	  }
	  else{
	  	$("#previewImgDiv").attr('src', '');
	  }
	}
  return(
    <div>
      <div className="text-right pb-3">您好，{data.memberName}</div>
      <BoardWrapper data = {data.postData} />
      <div className="form-group pt-3 mt-4 border-top">
      	<div className="form-group">
	      	<textarea className="form-control" name="postText" id="postText"></textarea>
	      </div>
	      <div className="form-group">
	      	<input type="file" className="form-control-file" accept="image/png, image/jpeg" id="postImg" onChange={previewImg}/>
	      	<img src="" id="previewImgDiv" width="200px" className="pt-2"/>
	      </div>
	      <div className="text-center pt-2">
	      	<button className="btn btn-primary" type="button" onClick={newData}>送出新貼文</button>
	      </div>
	    </div>
    </div>
  );
}

export default BoardBody;