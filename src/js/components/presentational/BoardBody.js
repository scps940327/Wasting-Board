import React,{ useCallback ,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from "react-google-recaptcha";

import BoardWrapper from './BoardWrapper.js';
import BoardForm from './BoardForm.js';
import FloatMenu from './FloatMenu.js';
import LoginModal from './LoginModal.js';

function BoardBody({data, refreshPost, setFbMemberInfo}){
	const url = 'https://script.google.com/macros/s/AKfycbxmykUcTSNSVPcGHg5R0u_w8mcH9JKEwG2e-ImEkoe91OF95uo/exec';
	const recaptchaKey = '6Lc9RKMUAAAAANFfDb7omGiGF5mUvbiMttD4VByC';
	const pagePostNum = 8;
  const [boardFormState,setboardFormState] = useState(false);
  const [loginModal, setLoginModal] = useState({show: false});
  const [hasMoreItem, sethasMoreItem] = useState(true);
  const [nowPage, setNowPage] = useState(0);
  const [newPostNum, setNewPostNum] = useState(0);

	useEffect(() => {
		window.addEventListener('scroll', windowScrollHandler);
   	getData();
  }, []);

  const getData = useCallback(() => {
  	var loadPage = nowPage + 1;
		var getPostParameter = {
   		requestAction: 'getPost',
      startItem: 1 + nowPage * pagePostNum + newPostNum,
      endItem: loadPage * pagePostNum +newPostNum + 1
   	}

		$.ajax({
		  url: url,
		  data: getPostParameter,
		  success: function(data) {
				refreshPost(data);
				setNowPage(loadPage);
				if(data.length === 8){
					sethasMoreItem(true);
				}
				else{
					sethasMoreItem(false);
				}
			},
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
			},
			cache: false
		});
	}, [])

	function newData(){
		var postTextItem = document.getElementById('postText');
	  var postImgItem = document.getElementById('postImg');
	  var postImgPreviewDiv = document.getElementById('previewImgDiv');
    var postImgItemData = '';

		if(postTextItem.value.legnth > 49999){
			toast.error('你的廢文太長超過50000字了哦！', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true
			});
		}
		else if(postTextItem.value.trim()){
			if(postImgPreviewDiv.src.indexOf(location.href) == -1){
				postImgItemData = postImgPreviewDiv.src.replace(',', '%');
			}
			var newPostParameter = {
		      requestAction: 'newPost',
		      dataTime: new Date(),
		      data: postTextItem.value.trim(),
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
				  refreshPost(data, 'new');

				  let nowNewPostNum = newPostNum + 1;
				  setNewPostNum(nowNewPostNum);

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
		// if(data.member.status.indexOf('new') === 0){
		// 	modalHandleClose();
		// }
		// else{
			var state = !boardFormState;
			if(state){
				document.querySelector('body, html').setAttribute("style", "overflow: hidden;");
			}
			else{
				document.querySelector('body, html').removeAttribute("style");
			}
			setboardFormState(state);
		//}
	}
	function modalHandleClose(){
    var state = !loginModal.show;
    setLoginModal({show: state});
  }
  function windowScrollHandler(){
  	var scrollTop = document.body.scrollTop; 
		var offsetHeight = document.body.offsetHeight; 
		var scrollHeight = document.body.scrollHeight;

  	if(!hasMoreItem){
      return;
    }
    if (scrollTop == scrollHeight - offsetHeight){
    }
  }
  return(
    <div>
      { (boardFormState)
      	? <BoardForm recaptchaKey={recaptchaKey} checkRecapcha={checkRecapcha} previewImg={previewImg} newData={newData} formReset={formReset}/>
		    : null 
		  }
      <FloatMenu handleBoardForm = {handleBoardForm} state={boardFormState}/>
      <BoardWrapper data = {data.postData} pageState={data.pageState}/>
      {(hasMoreItem)
      	? ((data.pageState == 'loaded')
      		? (<div className="text-center py-3">
	      			<button className="btn btn-light" onClick={getData}>載入更多</button>
	      		</div>)
      		: null)
	      : <div className="text-center py-3">沒有更多廢文了，快去發廢文吧</div>
	    }
	    <LoginModal show={loginModal.show} modalHandleClose={modalHandleClose} setFbMemberInfo={setFbMemberInfo}/>
    </div>
  );
}

export default BoardBody;