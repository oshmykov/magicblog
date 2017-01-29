import React from 'react';
import { Route, IndexRoute } from 'react-router';
import MagicHome from '~/components/containers/MagicHome';
import PostDetails from '~/components/containers/PostDetails';

const routes = (
	<Route>
		<Route path="/(:page)" component={MagicHome} />
		<Route path="/:year/:month/:day/:postId" component={PostDetails} />
	</Route>
);

module.exports = routes;