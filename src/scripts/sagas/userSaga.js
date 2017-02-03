import { call, put, takeEvery, takeLatest, delay, fork } from 'redux-saga/effects';
import { routerActions } from 'react-router-redux';

import { apiHelper, ajaxHandler } from '~/util/apiHelper';

import { actionTypes } from '~/constants/actionTypes';

function* login(action) {
	console.log('login sagas is started', action);
	try {
		const response = yield call([ajaxHandler, apiHelper.login], action.username, action.password);
		
		yield put({ type: actionTypes.USER_LOGIN_SUCCESS, response }); 
	}
	catch (ex) {
		console.log('ex', ex);
		
		yield put({ type: actionTypes.USER_LOGIN_FAILURE, ex });
	}
}

function* watchLogin() {
	yield takeEvery(actionTypes.USER_LOGIN, login);
}

export default function* watchers() {
	yield fork(watchLogin);
} 