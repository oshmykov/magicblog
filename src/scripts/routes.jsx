import React from 'react';
import { Route, IndexRoute } from 'react-router';
import MagicHome from './components/containers/MagicHome';

const routes = (
	<Route>
		<Route path="/" component={MagicHome} />
	</Route>
);

module.exports = routes;