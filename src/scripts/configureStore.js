import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers/index';
import rootSaga from './sagas/index';

const immutableStateMiddleware = reduxImmutableStateInvariant();
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
	const result = createStore(
		rootReducer,
		initialState,
		applyMiddleware(immutableStateMiddleware, sagaMiddleware)
	);
	
	sagaMiddleware.run(rootSaga);
	
	return result;
}

