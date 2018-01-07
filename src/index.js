import 'babel-polyfill';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.scss';
import App from './components/app';
import app from './reducer';
import { fetchData } from './actions';

import registerServiceWorker from './registerServiceWorker';

const loggerMiddleware = createLogger();

let store = createStore(app, applyMiddleware(thunkMiddleware, loggerMiddleware));


store.dispatch(fetchData('https://api.credr.com/v1/product/search/?q=eyJwYWdlIjoxLCJjdXJyZW50X2NpdHlfaWQiOjJ9'))
.then(() => console.log(store.getState()));

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
