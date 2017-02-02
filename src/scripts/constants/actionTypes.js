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
	POST_CREATE_FAILURE: null	
});