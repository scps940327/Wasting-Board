import React,{ PropTypes ,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FacebookProvider, LoginButton } from 'react-facebook';

function Login(){
	function handleResponse(data){
    console.log(data);
  }

  function handleError(error){
    this.setState({ error });
  }
	return(
		<div>
			<div>沒有任何事發生</div>
			<FacebookProvider appId="750233222045584">
	      <LoginButton
	        scope="email"
	        onCompleted={handleResponse}
	        onError={handleError}
	      >
	        <span>Login via Facebook</span>
	      </LoginButton>
	    </FacebookProvider>
	  </div>
	)
}

export default Login;