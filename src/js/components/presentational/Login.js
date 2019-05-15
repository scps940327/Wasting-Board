import React,{ PropTypes ,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FacebookProvider, LoginButton } from 'react-facebook';

function Login({getMemberInfo}){
	function handleResponse(data){
    console.log(data);
    getMemberInfo(data.profile);
  }

  function handleError(error){
    console.log(error);
  }
	return(
		<div>
			<FacebookProvider appId="750233222045584">
	      <LoginButton
	        scope="email"
	        onCompleted={handleResponse}
	        onError={handleError}
	        className="btn btn-primary"
	      >
	        Facebook 登入
	      </LoginButton>
	    </FacebookProvider>
	  </div>
	)
}

export default Login;