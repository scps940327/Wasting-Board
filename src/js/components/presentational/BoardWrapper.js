import React,{ PropTypes ,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function BoardItem({data, style}){
	var startDate = new Date(data.date);
	var nowDate = new Date();
	var progressBarWidthPercent = (1 - (nowDate - startDate)/(24*60*60*1000))*100;

	return(
		<div className="card post_item" style={style}>
			<div className="shadow-sm">
				<div>
					{data.img
						?<img src={data.img} width="100%" />
						: null}
				</div>
				<div className="card-body">
					<div className="m-0" style={{whiteSpace: 'pre-line'}}>{data.text}</div>
				</div>
				<div className="progress-bar" style={{width: progressBarWidthPercent + '%'}}></div>
			</div>
		</div>
	);
}

function BoardWrapper({data, pageState}){
  return(
  	<div>
	    {data.length > 0 
	    	? (<div className="card-columns pb-4">
		    		{data.map((postItem, i) => 
		    		<BoardItem data ={postItem} key={'post_item_' + i} />)}
	    		</div>) 
	    	: ((pageState == 'loaded') 
	    			? '沒有貼文可以顯示'
	    			: <div className="text-center text-secondary" style = {{fontSize: '30px'}}><i className="fas fa-spinner fa-pulse"></i></div>)}
	  </div>
  );
}

export default BoardWrapper;