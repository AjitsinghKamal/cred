import { combineReducers } from 'redux';

import {
	REQUEST_DATA,
	RECEIVE_DATA,
	SELECT_VIEW,
	REQUEST_LOCATION,
	RECEIVE_LOCATION,
	LOC_FINISH
 } from '../actions';

const LIST_DEFAULT = {
	isFetching: true,
	url: 'https://api.credr.com/v1/product/search/?q=eyJwYWdlIjoxLCJjdXJyZW50X2NpdHlfaWQiOjJ9',
	data: {}
}

function view(state = 0 , action) {
	switch (action.type) {
		case SELECT_VIEW:
			return action.view;
		default:
			return state;
	}
}

function list( state = LIST_DEFAULT, action) {
	switch (action.type) {

		case REQUEST_DATA:
			return Object.assign({}, state, { isFetching: true,
			url: action.url
		});

		case RECEIVE_DATA:
			return Object.assign({}, state, {
				isFetching: false,
				url: action.url,
				data: (action.result)? action.result : {}
			});

		default:
			return state;
	}
}

function locate( state = {complete: 0, bikes:[]}, action) {

	switch (action.type) {
		case LOC_FINISH:
			return Object.assign({}, state, {complete:action.status});
			
		case REQUEST_LOCATION:
			return Object.assign({}, state, {
				bikes:[
					...state.bikes,
					{
						locating: true,
						id: action.id
					}
				]
			});
		case RECEIVE_LOCATION:
			return Object.assign({}, state, {
				bikes: state.bikes.map((bike) => {
					if(bike.id === action.id) {
						return Object.assign({}, bike, {
							locating: false,
							lat: action.lat,
							long: action.long,
							address: action.address
						})
					}
					return bike;
				})
			})
		default:
			return state;
	}
}

const app = combineReducers({
	view,
	list,
	locate
});

export default app;