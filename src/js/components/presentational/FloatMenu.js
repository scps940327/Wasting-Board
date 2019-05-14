import React,{ PropTypes ,useState, useEffect } from 'react';

function FloatMenu({handleBoardForm, state}){
	return(
		<div className="float_menu">
			<button className="bg-primary text-white rounded-circle border-0" onClick={handleBoardForm}>
				{state
					?	<i className="fas fa-times"></i>
					: <i className="fas fa-plus"></i>
				}
			</button>
		</div>
	);
}

export default FloatMenu;