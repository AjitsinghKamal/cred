import React, { Component } from 'react';
import './style.scss';
const ListItem = (props) => {

	const data = Object.entries(props.value).map((i,index) => {
		return (
			<div key={index} className="row">
				<span className="field">{i[0]}</span>
				<span className="field">:</span>
				<span className="field"> {(i[1])? i[1].toString(): i[1]}</span>
			</div>
		)
	});

	return (
		<li className="bike-data">{data}</li>
	)

}

export default ListItem;