import React from 'react';
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router';

import store from '~/store'

import MagicHome from '~/components/containers/MagicHome';
import PostDetails from '~/components/containers/PostDetails';
import ManagePost from '~/components/containers/ManagePost';

const routes = (
	<Route>
		<Route path="/:year/:month/:day/:postId" component={PostDetails} />
		<Route path="post" onEnter={requireAuth}>
			<Route path="new" component={ManagePost} />
			<Route path="edit/:postId" component={ManagePost} />
			<Redirect from="*" to="new" />
			<IndexRedirect to="new" />
		</Route>
		<Route path="/(:page)" component={MagicHome} />
	</Route>
);

function requireAuth(nextState, replace) {
	const { user } = store.getState();
	if (!user.authenticated) {
		replace({
			pathname: 'login',
			state: { nextPathname: nextState.location.pathname }
		})		
	}
}

module.exports = routes;