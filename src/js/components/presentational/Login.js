import React,{ PropTypes ,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FacebookProvider, LoginButton, Profile } from 'react-facebook';

function Login({data, getFbMemberInfo}){
	const [memberData, setMemberData] = useState({status: 'new', name: '', picture: ''});
	function handleResponse(data){
    console.log(data.profile);
    //getFbMemberInfo(data.profile);
    setMemberData({status: 'FB', name: data.profile.name, picture: data.profile.picture.data.url})
    console.log(memberData);
  }

  function handleError(error){
    console.log(error);
  }
	return(
		<div>
			<FacebookProvider appId="750233222045584">
				{(memberData.status.indexOf('new') === 0)
		      ? (<LoginButton
		        scope="email"
		        onCompleted={handleResponse}
		        onError={handleError}
		        className="btn btn-primary"
		      >
		        Facebook 登入
		      </LoginButton>)
		      : <MemberInfo data = {memberData} />
	    	}
	    </FacebookProvider>
	  </div>
	)
}


function MemberInfo({data}){
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