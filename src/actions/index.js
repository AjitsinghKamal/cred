import fetch from 'cross-fetch';

export const SELECT_VIEW = 'SELECT_VIEW';
export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';

export const REQUEST_LOCATION = 'REQUEST_LOCATION';
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

export const LOC_FINISH = 'LOC_FINISH';

/**
 * action creator
 * user changes the current view to list or map
 */
export function selectView(view) {
	return {
		type: SELECT_VIEW,
		view
	}
}

/**
 * action creator
 * request for list
 */
export function requestData(url) {
	return {
		type: REQUEST_DATA,
		url
	}
}

/**
 * action creator
 * recieve list
 */
export function receiveData(url, json) {
	return {
		type: RECEIVE_DATA,
		url,
		result: json.map(item=> item)
	}
}

export function requestLocation(id) {
	return {
		type: REQUEST_LOCATION,
		id
	}
}

export function receiveLocation(id, lat, long, address) {
	return {
		type: RECEIVE_LOCATION,
		id,
		lat,
		long,
		address
	}
}






/**
 * async action creator
 * calls the api and dispatches requestData and receiveData action
 */
export function fetchData(url) {
	return function (dispatch) {
		dispatch(requestData(url));
		return fetch(url)
			.then(
				response => response.json(),
				error => console.error(error)
			)
			.then((json,error) => {
				dispatch(receiveData(url, json.payload.results)) 
				return json;
			})
			.then(json => {
				const locations = json.payload.results.map((bike, index) => {
					const bikeData = Object.assign({}, {
						location: bike.current_location_name,
						id: bike.vehicle_id,
						index: index
					});
					return dispatch(fetchLatLong(bikeData));
				})
				return dispatch(fetchAllLocations(locations))
			})
	}
}

export function fetchAllLocations(locations) {
	return function (dispatch) {
		Promise.all(locations)
			.then(() => dispatch(allLocationReceived()));
	}
}

export function allLocationReceived() {
	return {
		type: LOC_FINISH,
		status: 1
	}
}

export function fetchLatLong(data) {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${data.location}&region=in&key=${'AIzaSyDVWWePZ6_zxQGlJ5 - pmmgfWd2EsbYgYU8'}`;
	console.log(data);
	return function (dispatch) {
		dispatch(requestLocation(data.id));
		return fetch(url)
			.then(
				response => response.json(),
				error => console.error(error)
			)
			.then(json => {
				console.log(data);
				const position = json.results[0].geometry.location;
				return dispatch(receiveLocation(data.id, position.lat, position.lng, data.location))
			});
	}

}


