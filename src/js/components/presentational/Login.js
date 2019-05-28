import React,{ PropTypes ,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from 'react-toastify';

function Login({data}){
	const url = 'https://script.google.com/macros/s/AKfycbxrpD477NfYqmpOWwC_MeZpew9_INAQjEOX459N28-yajTvYd4e/exec';
	const recaptchaKey = '6Lc9RKMUAAAAANFfDb7omGiGF5mUvbiMttD4VByC';
	var xhr = new XMLHttpRequest();

	function checkRecapcha(){
		
	}

	function formControl(){
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

		var contactText = document.getElementById('contactFormTextarea');
		if(!contactText.value.trim()){
			contactText.focus();
			toast.error('怎麼是空白的呢？', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true
			});
			return; 
		}

		if(contactText.value.length > 49999){
			contactText.focus();
			toast.error('字數太多了！', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true
			});
			return;
		}

		var getParameter = {
			dataTime: new Date(),
      user: data.name,
      text: contactText.value.trim()
		}

		$.ajax({
		  url: url,
		  data: getParameter,
		  success: function(data) {
				console.log(data);
				toast.success('您的意見已經送出', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				});
			 },
			 error: function() {
			 	toast.success('您的意見運送過程好像出錯了', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				});
			 }
		});
	}
	function formReset(){
		document.getElementById('contactFormTextarea').value = '';
		grecaptcha.reset();
	}
	return(
		<div>
			<div className="py-3 text-dark">您好，感謝您使用廢文板 Wasting Board，如果您在使用上有遇到任何問題與建議，透過以下表單歡迎告知，廢文板也會不時的更新版面與功能以期望讓使用者可以有更好的體驗，最後祝您也能在廢中度過愉快的一天！</div>
			<div>
				<div className="form-group py-4">
					<textarea className="form-control" rows="5" placeholder="歡迎填寫意見於此" id="contactFormTextarea"></textarea>
				</div>
				<div className="form-group">
					<div className="row align-items-center">
						<div className="col-12 col-sm">
							<ReCAPTCHA
		            style={{ display: "inline-block" }}
		            theme="light"
		            ref={React.createRef()}
		            sitekey={recaptchaKey}
		            onChange={checkRecapcha}
		          />
		        </div>
		        <div className="col-12 col-sm pt-3 pt-sm-0 text-sm-right text-center">
		        	<button className="btn btn-primary" onClick={formControl}>送出</button>
		        </div>
		      </div>
				</div>
			</div>
		</div>
	)
}

export default Login; 