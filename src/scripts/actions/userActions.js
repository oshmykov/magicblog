import { actionTypes } from '~/constants/actionTypes';

export function login(username, password) {
	console.log('login action is called');
	return { type: actionTypes.USER_LOGIN, username, password };
}