import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './postsReducer';

const rootReducer = combineReducers({ 
	posts: posts,
	routing: routerReducer
});

export default rootReducer;