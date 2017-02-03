import React from 'react';
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router';
import MagicHome from '~/components/containers/MagicHome';
import PostDetails from '~/components/containers/PostDetails';
import ManagePost from '~/components/containers/ManagePost';

const routes = (
	<Route>
		
		<Route path="/:year/:month/:day/:postId" component={PostDetails} />
		<Route path="post">
			<Route path="new" component={ManagePost} />
			<Route path="edit/:postId" component={ManagePost} />
			<Redirect from="*" to="new" />
			<IndexRedirect to="new" />
		</Route>
		<Route path="/(:page)" component={MagicHome} />
	</Route>
);

function requireAuth(nextState, replace, param1, param2) {
	console.log('requireAuth', nextState, replace, param1, param2);
	/*
  if (!Auth.loggedIn()) {
    replace({
      pathname: 'login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
  */
}

module.exports = routes;