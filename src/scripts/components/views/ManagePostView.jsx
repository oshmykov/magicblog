import React from 'react';
import { Col, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import Editor from 'react-rte';

const ManagePostView = ({editorState, onContentChange, onInputChange, onSubmit, post, errors}) => {

	return (
		<div>
			<form onSubmit={onSubmit}>
				<FormGroup controlId="title" validationState={getValidationState(errors, 'title')}>
					<ControlLabel>Title</ControlLabel>
					<FormControl type="text" placeholder="Post Title" onChange={onInputChange} value={post.title} />
					<HelpBlock><ErrorMessagesView errors={errors} fieldName="title" /></HelpBlock>
				</FormGroup>
				<FormGroup controlId="content" validationState={getValidationState(errors, 'content')}>
					<ControlLabel>Content</ControlLabel>
					<Editor value={editorState} onChange={onContentChange} />
					<HelpBlock><ErrorMessagesView errors={errors} fieldName="content" /></HelpBlock>
				</FormGroup>
				<Button type="submit">
				  Submit
				</Button>				
			</form>
		</div>
	);

};

const getValidationState = (errors, fieldName) => {
	if (errors && errors[fieldName]) {
		return errors[fieldName].state;
	}
	return null;
};

const ErrorMessagesView = ({ errors, fieldName }) => {
	if (errors && errors[fieldName]) {
		const messages = errors[fieldName].messages || [];
		return (
			<ul>
			{
				messages.map((item, i) => {
					return (
						<li key={i}>
							{item}
						</li>
					);
				})
			}
			</ul>		
		);
	}
	
	return <noscript />;
};

ManagePostView.propTypes = {
	editorState: React.PropTypes.object.isRequired,
	onContentChange: React.PropTypes.func.isRequired,
	onInputChange: React.PropTypes.func.isRequired,
	onSubmit: React.PropTypes.func.isRequired,
	post: React.PropTypes.object.isRequired,
	errors: React.PropTypes.object.isRequired
};

export default ManagePostView;
