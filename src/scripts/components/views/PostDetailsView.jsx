import React from 'react';
import dateFormat from 'dateformat';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';

const PostDetailsView = ({ title, username, content, datetime, comments = [], user, comment }) => 
(
	<Grid className="post-details">
		<Row className="show-grid">
			<Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
				<h1>
					{title}
				</h1>
				<p dangerouslySetInnerHTML={{__html: content}}>
				</p>
				<footer>
					Posted by {username} on {dateFormat(new Date(datetime), 'fullDate')}
				</footer>				
			</Col>
		</Row>
		<Row className="show-grid">
			<Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
				<h2>
					{ comments.length > 0 && "Comments" }
				</h2>
				<ul className="comments">
				{
					comments.map((item, i) => {
						return (
							<li key={i}>
								{item.content}
								<footer>
									{dateFormat(new Date(item.datetime), 'yyyy/mm/d')} by {item.username.trim() || 'Anonymous'} 
								</footer>								
							</li>
						);
					})
				}					
				</ul>
			</Col>
		</Row>
		<CommentFormView isFirst={comments.length == 0} authenticated={user.authenticated} username={user.username}
			onChange={comment.onChange} onSubmit={comment.onSubmit} text={comment.text} errors={comment.errors} />
	</Grid>
);

export default PostDetailsView;

const CommentFormView = ({ text = '', onSubmit, onChange, isFirst = false, 
	authenticated = false, username, errors }) => 
(
	<Row className="show-grid">
		<Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
			<form onSubmit={onSubmit}>
				<FormGroup controlId="comment" validationState={getValidationState(errors, 'comment')}>
					<ControlLabel>{ isFirst ? "Be the first to comment" : "Add a new comment" }</ControlLabel>
					<FormControl componentClass="textarea" placeholder="Enter your text here"
						onChange={(e) => onChange(e.target.value)} value={text} />
					<HelpBlock><ErrorMessagesView errors={errors} fieldName="comment" /></HelpBlock>
				</FormGroup>			
				<Button type="submit">
					Submit as { authenticated ? username : 'Anonymous' }
				</Button>				 
			</form>
		</Col>
	</Row>	
);

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
