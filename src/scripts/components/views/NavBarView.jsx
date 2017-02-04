import React from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

const NavBarView = ({isAuthenticated = false, username}) => {
	const rightNav = getNav(isAuthenticated, username);
	
	return (
		<Navbar inverse collapseOnSelect>
			<Navbar.Header>
				<Navbar.Brand>
					<Link to="/">Magic Blog</Link>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>		
				{rightNav}
			</Navbar.Collapse>		
		</Navbar>
	);
};

export default NavBarView;

const getNav = (isAuthenticated = false, username) => {
	if (isAuthenticated) {
		return (
			<Nav pullRight>
				<LinkContainer to="post/new">
					<NavItem eventKey={1}>
						New Post
					</NavItem>
				</LinkContainer>
				<NavDropdown eventKey={3} title={`Welcome ${username}!`} id="basic-nav-dropdown">
					<MenuItem divider />
					<MenuItem eventKey={3.3}>Logout</MenuItem>
				</NavDropdown>					
			</Nav>
		);
	}
	
	return (
		<Nav pullRight>
			<NavItem eventKey={2}>Login</NavItem>				
		</Nav>
	);
};
