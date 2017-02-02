import initialState from '~/initialState';
import { actionTypes } from '~/constants/actionTypes';
import update from 'react-addons-update';

export default function postsReducer(state = initialState.posts, action) {
	switch (action.type) {
		case actionTypes.POSTS_READ_SUCCESS:
			return update(state, {
				$set: action.response
			});
		case actionTypes.POSTS_READ_FAILURE:
			console.log(action.ex.state(), action.ex.statusText);
			return state;
		case actionTypes.POST_READ_SUCCESS:
			return update(state, {
				$set: [action.response]
			});
		case actionTypes.POST_READ_FAILURE:
			console.error(action);
			return state;
		case actionTypes.POST_CREATE_SUCCESS:
			return update(state, {
				$set: [action.response, ...state]
			});
		case actionTypes.POST_CREATE_FAILURE:
			console.error(action);
			return state;
		default:
			return state;
	}
}

