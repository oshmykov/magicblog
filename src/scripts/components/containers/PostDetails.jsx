import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostDetailsView from '~/components/views/PostDetailsView';
import * as postsActions from '~/actions/postsActions';

class PostDetails extends React.Component {
	componentDidMount() {
		const postId = this.props.params.postId;
		
		if (!this.props.post) {
			this.props.actions.readPost(postId);
		}
	}
	
	componentWillReceiveProps(props) {
		const postId = this.props.params.postId;
		const nextPostId = props.params.postId;
		
		if (postId != nextPostId) {
			this.props.actions.readPost(nextPostId);
		}
	}

	render() {
		if (this.props.post) {
			return <PostDetailsView {...this.props.post} />
		}
		return <noscript />;
	}
};

const mapStateToProps = (state, props) => {
	const postId = props.params.postId;
	const post = getPostById(state.posts, postId);

	return {
		post: post
	}	
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(postsActions, dispatch)
	};
};

const getPostById = (posts = [], id) => {
	const filtered = posts.filter(p => p.id == id);
	if (filtered && filtered.length > 0) {
		return filtered[0];
	}
	return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);