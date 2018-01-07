import React, { Component } from 'react';
import './style.scss';
import { connect } from 'react-redux';
import ListItem from '../listitem';

const mapStateToProps = state => {
	return {
		fetch: state.list.isFetching,
		list: state.list.data
	}
}

const ListView = ({fetch,list}) => {
	
	function rebuild() {
		console.log(list);
		return list.map((item,index) => <ListItem value={item} key={index} />);
	}
	return (
		<div className="data-list">{fetch? 'fetching...': 'done'}
		<ul>{!fetch? rebuild() : null}</ul>
		</div>
	);
}



export default connect(
	mapStateToProps,
)(ListView)
