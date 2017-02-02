import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';

import rootReducer from './reducers/index';
import rootSaga from './sagas/index';

const immutableStateMiddleware = reduxImmutableStateInvariant();
const sagaMiddleware = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware(hashHistory);

export default function configureStore(initialState) {
	const result = createStore(
		rootReducer,
		initialState,
		applyMiddleware(immutableStateMiddleware, sagaMiddleware, routerMiddleware)
	);
	
	sagaMiddleware.run(rootSaga);
	
	return result;
}

