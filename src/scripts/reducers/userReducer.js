import initialState from '~/store/initialState';
import { actionTypes } from '~/constants/actionTypes';
import update from 'react-addons-update';

export default function userReducer(state = initialState.user, action) {
	switch (action.type) {
		case actionTypes.USER_READ:
			return state;
		
	
		case actionTypes.USER_LOGIN:
			console.log('LOGIN is handled');
			return state;
		case actionTypes.USER_LOGIN_SUCCESS:
			return update(state, {
				$set: action.response.data
			});
		case actionTypes.USER_LOGIN_FAILURE:
			console.error(action);
			return state;
		default:
			return state;
	}
}

