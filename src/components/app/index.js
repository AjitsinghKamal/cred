import React, { Component } from 'react';
import './style.scss';
import { connect } from 'react-redux';


import Header from '../header';
import ListView from '../listview';
import MapView from '../mapview';
import { selectView } from '../../actions/index';

const App = ({ view, toggleViewToList, toggleViewToMap}) =>{
		return (
			<div className="app">
				<Header />
				<nav className="tabs">
					<button className="tab" className={"tab "  + (!view ? 'active' : 'n-active')} onClick={toggleViewToList}>List</button>
					<button className="tab" className={"tab " + (view ? 'active' : 'n-active')} onClick={toggleViewToMap}>Map</button>
				</nav>
				<section className={"view-container " + (!view ? 'active-list' : 'active-map')}>
					<ListView />
					<MapView />
				</section>
			</div>
		);
}

const mapStateToProps = state => {
	return {
		view: state.view
	}
}


const mapDispatchToProps = dispatch => {
	return {
		toggleViewToList: () => {
			return dispatch(selectView(0));
		},

		toggleViewToMap: () => {
			return dispatch(selectView(1));
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)


