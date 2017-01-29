import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MagicHomeView from '~/components/views/MagicHomeView';
import * as postsActions from '~/actions/postsActions';
import paramsHelper from '~/util/paramsHelper';

class MagicHome extends React.Component {
	componentDidMount() {
		const currentPage = paramsHelper.getPageNumber(this.props.params.page);
		
		this.props.actions.readPosts(currentPage);
	}
	
	componentWillReceiveProps(props) {
		const currentPage = paramsHelper.getPageNumber(this.props.params.page);
		const nextPage = paramsHelper.getPageNumber(props.params.page);
		
		if (currentPage != nextPage) {
			this.props.actions.readPosts(nextPage);
		}
	}
	
	render() {
		return <MagicHomeView posts={this.props.posts} />
	}
};

const mapStateToProps = (state, ownProps) => {
	return {
		posts: state.posts
	}	
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(postsActions, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MagicHome);