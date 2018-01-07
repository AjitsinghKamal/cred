import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react'

import './style.scss';
import { connect } from 'react-redux';
import  MapItem from '../marker';


const MapView = ({view, status}) => {

	function createMarker() {
		console.log(status);
		return view.map((bike,index) => {
			return <MapItem lat={bike.lat} lng={bike.long} text={bike.id} key={index}/>
		});
	}
	return (
		<GoogleMapReact bootstrapURLKeys={{
			key: 'AIzaSyB3QFTpQiVCVGBgm8aRhma78WwKgn7UDdo'
			
		}} defaultCenter={{lat:19.0760, lng:72.8777 }}
			defaultZoom={11}>
			{(status)? createMarker() : null}
			
		</GoogleMapReact>
	);
}

const mapStateToProps = state => {
	return {
		view: state.locate.bikes,
		status: state.locate.complete
	}
}

export default connect(
	mapStateToProps,
)(MapView)