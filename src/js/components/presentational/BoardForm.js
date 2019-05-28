import React,{ PropTypes ,useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

function BoardForm({recaptchaKey, checkRecapcha, previewImg, newData, formReset}){
	return(
		<div className="row align-items-center board-form-wrapper">
			<div className="col">
				<div className="max_width">
					<div className="board-form bg-white">
						<div className="row no-gutters bg-primary py-2 px-3 text-center text-white">
							<div className="col font-weight-bold">發個廢文</div>
							<button className="col-auto bg-transparent border-0 text-white" onClick={formReset}>
								<i className="fas fa-times"></i>
							</button>
						</div>
			      <div className="p-3 form-group pb-4">
			      	<div className="form-group">
				      	<textarea className="form-control" name="postText" id="postText"></textarea>
				      </div>
				      <div className="form-group">
				      	<input type="file" className="form-control-file" accept="image/png, image/jpeg" id="postImg" onChange={previewImg}/>
				      	<img src="" id="previewImgDiv" width="200px" className="pt-2"/>
				      </div>
				      <div className="row align-items-center">
					      <div className="col-sm-auto col-12">
					      	<ReCAPTCHA
				            style={{ display: "inline-block" }}
				            theme="light"
				            ref={React.createRef()}
				            sitekey={recaptchaKey}
				            onChange={checkRecapcha}
				          />
					      </div>
					      <div className="col-sm col-12">
					      	<button className="btn btn-primary" type="button" onClick={newData}>送出新貼文</button>
					      </div>
					    </div>
				    </div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BoardForm;