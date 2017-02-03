import keyMirror from 'key-mirror';

export const actionTypes = keyMirror({
	POSTS_READ: null,
	POSTS_READ_SUCCESS: null,
	POSTS_READ_FAILURE: null,
	
	POST_READ: null,
	POST_READ_SUCCESS: null,
	POST_READ_FAILURE: null,
	
	POST_UPDATE: null,
	POST_UPDATE_SUCCESS: null,
	POST_UPDATE_FAILURE: null,
	
	POST_CREATE: null,
	POST_CREATE_SUCCESS: null,
	POST_CREATE_FAILURE: null,
	
	USER_READ: null,
	USER_READ_SUCCESS: null,
	USER_READ_FAILURE: null,
	
	USER_LOGIN: null,
	USER_LOGIN_SUCCESS: null,
	USER_LOGIN_FAILURE: null
});