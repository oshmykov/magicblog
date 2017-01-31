import React from 'react';
import { Route, IndexRoute } from 'react-router';
import MagicHome from '~/components/containers/MagicHome';
import PostDetails from '~/components/containers/PostDetails';
import ManagePost from '~/components/containers/ManagePost';

const routes = (
	<Route>
		<Route path="/(:page)" component={MagicHome} />
		<Route path="/:year/:month/:day/:postId" component={PostDetails} />
		<Route path="/post/new" component={ManagePost} />
		<Route path="/post/edit/:postId" component={ManagePost} />
	</Route>
);

module.exports = routes;