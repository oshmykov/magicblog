import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostDetailsView from '~/components/views/PostDetailsView';
import * as postsActions from '~/actions/postsActions';

import validator from '~/util/validator';

class PostDetails extends React.Component {
	constructor(props) {
		super(props);
		this.onCommentChange = this.onCommentChange.bind(this);
		this.onCommentSubmit = this.onCommentSubmit.bind(this);
		
		this.state = {
			comment: '',
			errors: {
				comment: null
			}
		};
	}
	
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
	
	onCommentChange(newComment) {
		return this.setState({ 
			comment: newComment,
			errors: {
				comment: null
			}
		});
	}
	
	onCommentSubmit(event) {
		const submitData = {
			comment: this.state.comment
		};
		
		const errors = validator.validate(submitData, schema);
		
		this.setState({ errors });
		if (validator.isValid(errors)) {
			this.props.actions.createComment(this.props.user.username, this.props.post.id, submitData.comment);
			this.setState({ 
				comment: '', 
				errors: { 
					comment: null 
				} 
			});
		}
		
		event.preventDefault();
	}	

	render() {
		const comment = {
			text: this.state.comment, 
			onChange: this.onCommentChange, 
			onSubmit: this.onCommentSubmit,
			errors: this.state.errors
		};
	
		if (this.props.post) {
			return <PostDetailsView {...this.props.post} 
				user={this.props.user} 
				comment={comment} />
		}
		return <noscript />;
	}
};

const mapStateToProps = (state, props) => {
	const postId = props.params.postId;
	const post = getPostById(state.posts, postId);

	return {
		post: post,
		user: state.user
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

const schema = {
	comment: {
		type: 'string',
		required: true,
		fieldName: 'Comment'
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);