import { actionTypes } from '~/constants/actionTypes';

export function readPosts(data) {
	return { type: actionTypes.POSTS_READ, data };
}

export function readPost(data) {
	return { type: actionTypes.POST_READ, data };
}

