import React, { Component } from 'react';
// import './style.scss';
const MapItem = (props) => {
	return (
		<div style={{
			position: 'relative', color: 'black', background: '#4CAF50',
			height: 30, width: 30, top: -20, left: -30,
		}}>{props.text}</div>
	)
};

export default MapItem;