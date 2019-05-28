import React,{ PropTypes ,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'react-bootstrap';
import { FacebookProvider, LoginButton} from 'react-facebook';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';

function LoginModal({show, modalHandleClose, setFbMemberInfo}){
	const testData = {
		profile:{
			name: 'Lauren Chen', 
			picture: {
				data:{
					url: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2422504531117147&height=50&width=50&ext=1560587977&hash=AeTlnA8glgijcHo_"
				}
			}
		}
	};
	const loginBtnStyle = {width: '133px'}


	function handleFbResponse(data){
		var memberInfo = {name: data.profile.name, picture: data.profile.picture.data.url, status: 'fb'};
    setFbMemberInfo(memberInfo);
    modalHandleClose();
  	toast.success('你可以開始發廢文了！', {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true
		});
  }
  function handleError(error){
  	modalHandleClose();
  	//setFbMemberInfo(testData.profile);
    console.log(error);
  	toast.error('Facebook登入失敗！', {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true
		});
  }
  function visitorLogin(){
  	var memberInfo = {name: '訪客', picture: '', status: 'visitor'};
  	setFbMemberInfo(memberInfo);
    modalHandleClose();
  	toast.success('你可以開始發廢文了！', {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true
		});
  }
	return(
		<div>
	    <Modal show={show} onHide={modalHandleClose} centered>
	      <Modal.Header closeButton>
	        <Modal.Title>登入</Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
	      	<div className="text-center">
	      	<div className="py-3">登入才能使用帳戶功能</div>
						<FacebookProvider appId="750233222045584">
							<LoginButton
					        scope="email"
					        onCompleted={handleFbResponse}
					        onError={handleError}
					        className="btn btn-blue"
					      >
				        Facebook 登入
				      </LoginButton>
				    </FacebookProvider>
				  </div>
			  </Modal.Body>
	    </Modal>
	  </div>
	)
}

export default LoginModal;