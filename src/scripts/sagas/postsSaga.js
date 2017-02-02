import { call, put, takeEvery, takeLatest, delay, fork } from 'redux-saga/effects';
import { routerActions } from 'react-router-redux';

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

function* postCreate(action) {
	try {
		const { response, error } = yield call([ajaxHandler, apiHelper.createPost], action.data.title, action.data.content);
		
		if (!response) {
			throw new Error(error);
		}
		
		console.log('postCreate', response);
		
		yield put({ type: actionTypes.POST_CREATE_SUCCESS, response });
		
		yield put(routerActions.push('/'));
	}
	catch (ex) {
		yield put({ type: actionTypes.POST_CREATE_FAILURE, ex });
	}
}

function* postUpdate(action) {
	const postId = action.data.postId;
	try {
		const { response, error } = yield call([ajaxHandler, apiHelper.createPost], postId, action.data.title, action.data.content);
		
		if (!response) {
			throw new Error(error);
		}
		
		yield put({ type: actionTypes.POST_UPDATE_SUCCESS, response });
	}
	catch (ex) {
		yield put({ type: actionTypes.POST_UPDATE_FAILURE, ex });
	}
}

function* watchPostsRead() {
	yield takeLatest(actionTypes.POSTS_READ, postsRead);
}

function* watchPostRead() {
	yield takeLatest(actionTypes.POST_READ, postRead);
}

function* watchPostCreate() {
	yield takeLatest(actionTypes.POST_CREATE, postCreate);
}

function* watchPostUpdate() {
	yield takeLatest(actionTypes.POST_UPDATE, postUpdate);
}

export default function* watchers() {
	yield fork(watchPostsRead);
	yield fork(watchPostRead);
	yield fork(watchPostCreate);
	yield fork(watchPostUpdate);
} 