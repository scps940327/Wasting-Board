import React,{ PropTypes ,useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function BoardItem({data}){
	return(
		<div className="card post_item">
			<div className="shadow-sm">
				<div>
					{data.img
						?<img src={data.img} width="100%" />
						: null}
				</div>
				<div className="card-body">
					<pre className="m-0">{data.text}</pre>
				</div>
			</div>
		</div>
	);
}

function BoardWrapper({data}){
	useEffect(() => {
  }, []);
  return(
    <div className="card-columns pb-4">
    {data.length > 0 
    	? (data.map((postItem, i) => 
    		<BoardItem data ={postItem} key={'post_item_' + i} />)) 
    	: '沒有貼文可以顯示'}
    </div>
  );
}

export default BoardWrapper;