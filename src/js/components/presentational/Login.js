import React,{ PropTypes ,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useCookies } from 'react-cookie';

function Login({data}){
	return(
		<div>
			<div>歡迎你，登入成功！</div>
			<div>
				<img src={data.picture} />
			</div>
			<div>{data.name}</div>
		</div>
	)
}

export default Login; 