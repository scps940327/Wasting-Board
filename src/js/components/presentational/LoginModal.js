import React,{ PropTypes ,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'react-bootstrap';
import { FacebookProvider, LoginButton} from 'react-facebook';

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
	function handleFbResponse(data){
    console.log('modal: ' + data.profile);
    setFbMemberInfo(data.profile);
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
	return(
		<div>
	    <Modal show={show} onHide={modalHandleClose} centered>
	      <Modal.Header closeButton>
	        <Modal.Title>登入</Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
	      	<div className="text-center">
						<FacebookProvider appId="750233222045584">
							<LoginButton
					        scope="email"
					        onCompleted={handleFbResponse}
					        onError={handleError}
					        className="btn btn-primary"
					      >
				        Facebook 登入
				      </LoginButton>
				    </FacebookProvider>
				  </div>
			  </Modal.Body>
	    </Modal>
	    <ToastContainer />
	  </div>
	)
}

export default LoginModal;