import React,{ PropTypes ,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Get } from 'react-axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from "react-google-recaptcha";

import BoardWrapper from './BoardWrapper.js';
import BoardForm from './BoardForm.js';
import FloatMenu from './FloatMenu.js';

function BoardBody({data, refreshPost}){
	const url = 'https://script.google.com/macros/s/AKfycbypgJ7I7ZIiwP_AEgPtGrTGVCgCRbMBZ4aT_jOL7-Ev8tVLqOsq/exec';
	const recaptchaKey = '6Lc9RKMUAAAAANFfDb7omGiGF5mUvbiMttD4VByC';
  const [boardFormState,setboardFormState] = useState(false);

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

				  toast.success('發廢文成功!', {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true
					});
					formReset();
				},
				cache: false,
				error: (xhr, ajaxOptions, thrownError) => {
					toast.error('貌似有什麼出錯了？', {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true
					});
					console.log(xhr.responseText + thrownError);
					formReset();
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
	function formReset(){
		var postTextItem = document.getElementById('postText');
	  var postImgItem = document.getElementById('postImg');
	  var postImgPreviewDiv = document.getElementById('previewImgDiv');
		
		document.querySelector('body, html').removeAttribute("style");
		setboardFormState(false);
		postText.value = '';
	  postImgItem.value = '';
	  postImgPreviewDiv.src = '';
		grecaptcha.reset();
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
	      var img = new Image;
	      img.onload = function() {
          var scale = img.width / img.height;
          if(scale > 0.9){ //橫式圖片
          	dealImage(reader.result,{width:400},function(base){
			　　　　document.getElementById('previewImgDiv').setAttribute('src',base);
						});
          }
          else{
          	var newImgWidth = img.width / (Math.sqrt(img.width * img.height / 200000));
          	dealImage(reader.result,{width:newImgWidth},function(base){
			　　　　document.getElementById('previewImgDiv').setAttribute('src',base);
						});
          }
        };
        img.src = reader.result;
				
	    	//console.log('壓縮圖檔完成' + e.target.result.length);
	    }
	    reader.readAsDataURL(postImgItem.files[0]);
		}
		else if(postImgItem.files && postImgItem.files[0]){
	    reader.onload = function (e) {
	      document.getElementById('previewImgDiv').setAttribute('src',e.target.result);
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
	function handleBoardForm(){
		var state = !boardFormState;
		if(state){
			document.querySelector('body, html').setAttribute("style", "overflow: hidden;");
		}
		else{
			document.querySelector('body, html').removeAttribute("style");
		}
		setboardFormState(state);
	}
  return(
    <div>
      <div className="text-right pb-3">您好，{data.memberName}</div>
      { (boardFormState)
      	? <BoardForm recaptchaKey={recaptchaKey} checkRecapcha={checkRecapcha} previewImg={previewImg} newData={newData}/>
		    : null 
		  }
      <FloatMenu handleBoardForm = {handleBoardForm} state={boardFormState}/>
      <BoardWrapper data = {data.postData} />
	    <ToastContainer />
    </div>
  );
}

export default BoardBody;