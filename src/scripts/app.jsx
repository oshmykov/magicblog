import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import { Router, browserHistory } from 'react-router';
import routes from './routes';

import blogMakers from '~/makers/blogMakers';

const store = configureStore(blogMakers);

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes} />
	</Provider>, document.getElementById('app')
);