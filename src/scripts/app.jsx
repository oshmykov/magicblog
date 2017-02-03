import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import store from '~/store';

import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>,
	document.getElementById('app')
);