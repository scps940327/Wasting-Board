import React,{ PropTypes ,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import BoardWrapper from './BoardWrapper.js'
import { Get } from 'react-axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from "react-google-recaptcha";

function BoardBody({data, refreshPost}){
	const url = 'https://script.google.com/macros/s/AKfycbyoOCkTJxCNBGyCqd1NZEZalflUt6jmAahjPtJp-OJJ_gApOGA/exec';
	const recaptchaKey = '6Lc9RKMUAAAAANFfDb7omGiGF5mUvbiMttD4VByC';

	useEffect(() => {
   	getData();
  }, []);
  function getData(){
		var getPostParameter = {
   		requestAction: 'getPost'
   	}

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
			var newPostParameter = {
		      requestAction: 'newPost',
		      dataTime: new Date(),
		      data: postTextItem.value,
		      dataImg: postImgItemData,
		      insertType: 'bottom',
		      row: 1,
		      column: 3
	    }

	    if (grecaptcha === undefined) {
	    	toast.error('機器人驗證未設定', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				});
				return; 
			}

			var response = grecaptcha.getResponse();

			if (!response) {
				toast.error('請通過機器人驗證', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				});
				return; 
			}

			$.ajax({
			  url: url,
			  data: newPostParameter,
			  type: 'POST',
			  success: (data) => {
					console.log('get data');
				  refreshPost(data.reverse());
				  postText.value = '';
				  postImgItem.value = '';
				  postImgPreviewDiv.src = '';
				  toast.success('發廢文成功!', {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true
					});
					grecaptcha.reset();
				},
				cache: false,
				error: () => {
					postText.value = '';
				  postImgItem.value = '';
				  postImgPreviewDiv.src = '';
					toast.error('貌似有什麼出錯了？', {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true
					});
					grecaptcha.reset();
				}
			});
	  }
	  else {
	  	postTextItem.focus();
	  	toast.error('廢文總要有點文字吧？', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true
			});
	  }
	}
	function previewImg(){
		var postImgItem = document.getElementById('postImg');
		var file = postImgItem.files[0];
		var type = file.type;//檔案型別
		var size = (file.size/ 1024).toPrecision(4); //檔案大小轉為KB
	  var reader = new FileReader();

	  if (postImgItem.accept.indexOf(type)==-1) {
			alert("請選擇PNG或JPEG的圖片格式");
			postImgItem.value="";
			$("#previewImgDiv").attr('src', '');
			return false;
		}
		else if (size > 50) { //圖檔需大於50KB會進行壓縮
			reader.onload = function (e) {
	      $("#previewImgDiv").attr('src', e.target.result);
				dealImage(this.result,{width:400},function(base){
	　　　　document.getElementById('previewImgDiv').setAttribute('src',base)
				});
	    	//console.log('壓縮圖檔完成' + e.target.result.length);
	    }
	    reader.readAsDataURL(postImgItem.files[0]);
		}
		else if(postImgItem.files && postImgItem.files[0]){
	    reader.onload = function (e) {
	      $("#previewImgDiv").attr('src', e.target.result);
	    }
	    reader.readAsDataURL(postImgItem.files[0]);
	  }
	  else{
	  	$("#previewImgDiv").attr('src', '');
	  }
	}
	function dealImage(path, obj, callback){
		var img = new Image();
		img.src = path;
		img.onload = function(){
			var that = this;
			// 預設按比例壓縮
			var w = that.width,
			h = that.height,
			scale = w / h;
			w = obj.width || w;
			h = obj.height || (w / scale);
			var quality = 0.7; // 預設圖片質量為0.7
			//生成canvas
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			// 建立屬性節點
			var anw = document.createAttribute("width");
			anw.nodeValue = w;
			var anh = document.createAttribute("height");
			anh.nodeValue = h;
			canvas.setAttributeNode(anw);
			canvas.setAttributeNode(anh);
			ctx.drawImage(that, 0, 0, w, h);
			// 影象質量
			if(obj.quality && obj.quality <= 1 && obj.quality > 0){
				quality = obj.quality;
			}
			// quality值越小，所繪製出的影象越模糊
			var base64 = canvas.toDataURL('image/jpeg', quality );
			// 回撥函式返回base64的值
			callback(base64);
		}
	}
	function checkRecapcha(value){
		//console.log("Captcha value:", value);
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
	      <div>
	      	<ReCAPTCHA
            style={{ display: "inline-block" }}
            theme="light"
            ref={React.createRef()}
            sitekey={recaptchaKey}
            onChange={checkRecapcha}
          />
	      </div>
	      <div className="text-center pt-2">
	      	<button className="btn btn-primary" type="button" onClick={newData}>送出新貼文</button>
	      </div>
	    </div>
	    <ToastContainer />
    </div>
  );
}

export default BoardBody;