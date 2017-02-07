import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import NavBar from './NavBar';

export default class App extends React.Component {
	static propTypes = {
		children: React.PropTypes.object.isRequired
	};

	render() {
		const props = {};
		
		return (
			<div>
				<header>
					<NavBar />
				</header>
				<main>
				{
					React.Children.map(this.props.children, (child) => {
						return React.cloneElement(child, props)
					})
				}					
				</main>
				<footer className="container">
					Copyright © BagicBlog 2016
				</footer>
			</div>
		);
	}
}