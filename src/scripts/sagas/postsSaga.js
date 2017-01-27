import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects';

import { apiHelper, ajaxHandler } from '~/util/apiHelper';
import postsConstants from '~/constants/postsConstants';

export function* readPosts(orderBy = postsConstants.ORDER_BY, 
		ascending = postsConstants.ASCENDING, 
		skip = 0, 
		take = postsConstants.ITEMS_PER_PAGE) {
		
	try {
		const { response, error } = yield call([ajaxHandler, apiHelper.readPosts], 
			orderBy, ascending, skip, take);
			
		if (response) {
			yield put({ type: 'POSTS_READ_SUCCESS', response });
		}
		else {
			yield put({ type: 'POSTS_READ_FAIL', error });
		}
	}
	catch (ex) {
		yield put({ type: 'POSTS_READ_EXCEPTION', ex });
	}
}