import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';

import NavBarView from '~/components/views/NavBarView';

class NavBar extends React.Component {
	render() {

		return <NavBarView
			isAuthenticated={this.props.user.authenticated}
			username={this.props.user.username} />
	}
}

const mapStateToProps = (state, props) => {
	return {
		user: state.user
	};
};

const mapDispatchToProps = dispatch => {
	return {
		routerActions: bindActionCreators(routerActions, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
