import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './postsReducer';
import user from './userReducer';

const rootReducer = combineReducers({ 
	posts: posts,
	user: user,
	routing: routerReducer
});

export default rootReducer;