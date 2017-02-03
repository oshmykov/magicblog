import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MagicHomeView from '~/components/views/MagicHomeView';
import * as postsActions from '~/actions/postsActions';
import * as userActions from '~/actions/userActions';
import paramsHelper from '~/util/paramsHelper';

class MagicHome extends React.Component {
	constructor() {
		super();
		this.login = this.login.bind(this);
	}
	
	componentDidMount() {
		const currentPage = paramsHelper.getPageNumber(this.props.params.page);
		
		this.props.actions.readPosts(currentPage);
	}
	
	login() {
		console.log('login is called');
		this.props.userActions.login();
	}
	
	componentWillReceiveProps(props) {
		console.log('componentWillReceiveProps', props);
	
		const currentPage = paramsHelper.getPageNumber(this.props.params.page);
		const nextPage = paramsHelper.getPageNumber(props.params.page);
		
		if (currentPage != nextPage) {
			this.props.actions.readPosts(nextPage);
		}
	}
	
	render() {
		return <MagicHomeView posts={this.props.posts} loginHandler={this.login} authenticated={this.props.user.authenticated} />
	}
};

const mapStateToProps = (state, ownProps) => {
	return {
		posts: state.posts,
		user: state.user
	}	
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(postsActions, dispatch),
		userActions: bindActionCreators(userActions, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MagicHome);