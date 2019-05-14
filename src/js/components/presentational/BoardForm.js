import React,{ PropTypes ,useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

function BoardForm({recaptchaKey, checkRecapcha, previewImg, newData}){
	return(
		<div className="board_form bg-white">
			<div className="bg-primary py-2 px-3 text-center font-weight-bold text-white">發個廢文</div>
      <div className="p-3 form-group pb-4">
      	<div className="form-group">
	      	<textarea className="form-control" name="postText" id="postText"></textarea>
	      </div>
	      <div className="form-group">
	      	<input type="file" className="form-control-file" accept="image/png, image/jpeg" id="postImg" onChange={previewImg}/>
	      	<img src="" id="previewImgDiv" width="200px" className="pt-2"/>
	      </div>
	      <div className="row align-items-center">
		      <div className="col-auto">
		      	<ReCAPTCHA
	            style={{ display: "inline-block" }}
	            theme="light"
	            ref={React.createRef()}
	            sitekey={recaptchaKey}
	            onChange={checkRecapcha}
	          />
		      </div>
		      <div className="col">
		      	<button className="btn btn-primary" type="button" onClick={newData}>送出新貼文</button>
		      </div>
		    </div>
	    </div>
		</div>
	);
}

export default BoardForm;