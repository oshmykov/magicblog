import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import empty from 'is-empty';
import diff from 'object-diff';
import dateFormat from 'dateformat';

import Editor from 'react-rte';

import ManagePostView from '~/components/views/ManagePostView';
import * as postsActions from '~/actions/postsActions';
import update from 'react-addons-update';
import validator from '~/util/validator';



class ManagePost extends React.Component {
	constructor(props) {
		super(props);
		this.onContentChange = this.onContentChange.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.unauthorizedToEdit = this.unauthorizedToEdit.bind(this);
		
		this.state = {
			post: props.post,
			editorState: Editor.createValueFromString(props.post.content, CONTENT_FORMAT),
			errors: {}
		};
	}
	
	componentDidMount() {
		if (isReadyToEdit(this.props.post)) {
			if (!isAuthorizedToEdit(this.props.post, this.props.user)) {
				this.unauthorizedToEdit(this.props.post);
			}
		}
		else if (isTryingToEdit(this.props.params)) {
			this.props.actions.readPost(this.props.params.postId);
		}
	}

	componentWillReceiveProps(props) {
		const postId = this.props.params.postId;
		const nextPostId = props.params.postId;
		
		if (postId != nextPostId) {
			this.props.actions.readPost(nextPostId);
		}
		
		if (props.post) {
			if (isReadyToEdit(props.post)) {
				if (isAuthorizedToEdit(props.post, props.user)) {
					this.setState({
						post: props.post,
						editorState: Editor.createValueFromString(props.post.content, CONTENT_FORMAT),
						errors: {}
					});				
				}
				else {
					this.unauthorizedToEdit(this.props.post);
				}
			}
		}
	}
	
	unauthorizedToEdit(post) {
		const datePosted = dateFormat(new Date(post.datetime), 'yyyy/mm/d');
		
		this.props.routerActions.replace(`${datePosted}/${post.id}`);
	}
	
	onContentChange(editorState) {
		this.setState({ 
			editorState: editorState, 
			errors: update(this.state.errors, {
				content: { $set: null }
			})
		});
	}
	
	onInputChange(event) {
		const targetId = event.target.id;

		return this.setState({ 
			post: update(this.state.post, {
				[targetId]: { $set: event.target.value }
			}),
			errors: update(this.state.errors, {
				[targetId]: { $set: null }
			})
		});
	}
	
	onSubmit(event) {
		console.log('onSubmit is fired');
	
		const submitData = {
			title: this.state.post.title,
			content: contentHtmlToString(this.state.editorState)
		};
		
		const errors = validator.validate(submitData, schema);
		
		this.setState({ errors });
		if (validator.isValid(errors)) {
			if (this.props.post.id) {
				const diffData = diff(this.props.post, submitData);
				
				if (!empty(diffData)) {
					diffData.id = this.props.post.id;
					
					this.props.actions.updatePost(diffData);
				}
			}
			else {
				this.props.actions.createPost(submitData);
			}
		}
		
		event.preventDefault();
	}
	
	render() {
		return <ManagePostView post={this.state.post} editorState={this.state.editorState} onContentChange={this.onContentChange} 
			onInputChange={this.onInputChange} onSubmit={this.onSubmit} errors={this.state.errors} />
	}
}

const mapStateToProps = (state, props) => {
	const postId = props.params.postId;
	const post = getPostById(state.posts, postId);

	return {
		post: post,
		user: state.user
	}	
};

const getPostById = (posts = [], id) => {
	if (id) {
		const filtered = posts.filter(p => p.id == id);
		if (filtered && filtered.length > 0) {
			return filtered[0];
		}
	}
	
	return {
		title: "",
		content: ""
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(postsActions, dispatch),
		routerActions: bindActionCreators(routerActions, dispatch)
	};
};

const CONTENT_FORMAT = 'html';
const EMPTY_CONTENT_HTML = '<p><br></p>';
const contentHtmlToString = editorState => {
	const asString = editorState.toString(CONTENT_FORMAT);
	return asString == EMPTY_CONTENT_HTML ? '' : asString;
};

const isReadyToEdit = post => post && post.id;

const isTryingToEdit = params => params && params.postId;

const isAuthorizedToEdit = (post, user) => post.username == user.username;

const schema = {
	title: {
		type: 'string',
		required: true,
		fieldName: 'Title'
	},
	content: {
		type: 'string',
		required: true,
		fieldName: 'Content'
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePost);