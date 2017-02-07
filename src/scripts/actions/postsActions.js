import { actionTypes } from '~/constants/actionTypes';

export function readPosts(data) {
	return { type: actionTypes.POSTS_READ, data };
}

export function readPost(data) {
	return { type: actionTypes.POST_READ, data };
}

export function createPost(data) {
	return { type: actionTypes.POST_CREATE, data };
}

export function updatePost(data) {
	return { type: actionTypes.POST_UPDATE, data };
}

export function createComment(username, postId, text) {
	return { type: actionTypes.COMMENT_CREATE, username, postId, text };
}

