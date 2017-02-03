import initialState from '~/store/initialState';
import { actionTypes } from '~/constants/actionTypes';
import update from 'react-addons-update';

export default function postsReducer(state = initialState.posts, action) {
	switch (action.type) {
		case actionTypes.POSTS_READ_SUCCESS:
			return update(state, {
				$set: action.response
			});
		case actionTypes.POSTS_READ_FAILURE:
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
		case actionTypes.POST_UPDATE_SUCCESS:
			const index = state.findIndex(p => p.id == action.response.id);
			if (index == -1) {
				throw new Error('Unable to update state with invalid postId', postId);
			}
			else {
				return update(state, {
					$splice: [[index, 1, action.response]]
				});
			}
		case actionTypes.POST_UPDATE_FAILURE:
			console.error(action);
			return state;
		default:
			return state;
	}
}

