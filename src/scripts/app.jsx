import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import { Router, hashHistory } from 'react-router';
import routes from './routes';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory} routes={routes} />
	</Provider>, document.getElementById('app')
);