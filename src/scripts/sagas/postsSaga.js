import { call, put, takeEvery, takeLatest, delay, fork } from 'redux-saga/effects';

import { apiHelper, ajaxHandler } from '~/util/apiHelper';

import { actionTypes } from '~/constants/actionTypes';


function* postsRead(action) {
	const page = action.data;
	
	try {
		const { response, error } = yield call([ajaxHandler, apiHelper.readPosts], page);
		
		if (!response) {
			throw new Error(error);
		}
		
		yield put({ type: actionTypes.POSTS_READ_SUCCESS, response });
	}
	catch (ex) {
		yield put({ type: actionTypes.POSTS_READ_FAILURE, ex });
	}
}

function* postRead(action) {
	const postId = action.data;
	
	try {
		const { response, error } = yield call([ajaxHandler, apiHelper.readPost], postId);
		
		if (!response) {
			throw new Error(error);
		}
		
		yield put({ type: actionTypes.POST_READ_SUCCESS, response });
	}
	catch (ex) {
		yield put({ type: actionTypes.POST_READ_FAILURE, ex });
	}
}

function* watchPostsRead() {
	yield takeLatest(actionTypes.POSTS_READ, postsRead);
}

function* watchPostRead() {
	yield takeLatest(actionTypes.POST_READ, postRead);
}

export default function* watchers() {
	yield fork(watchPostsRead);
	yield fork(watchPostRead);
} 