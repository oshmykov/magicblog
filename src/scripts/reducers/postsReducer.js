import initialState from '~/initialState';

export default function blogReducer(state = initialState.posts, action) {
	switch (action.type) {
		case 'POSTS_READ_SUCCESS':
			return action.response;
		case 'POSTS_READ_FAIL':
			//console.log(action.error.state(), action.error.statusText);
			return state;
		case 'POSTS_READ_EXCEPTION':
			//console.log(action.ex.state(), action.ex.statusText);
			return state;
		default:
			return state;
	}
}

