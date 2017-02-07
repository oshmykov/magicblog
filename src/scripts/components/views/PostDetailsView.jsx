import React from 'react';
import dateFormat from 'dateformat';
import { Grid, Row, Col } from 'react-bootstrap';

const PostDetailsView = ({ title, username, content, datetime, comments = [] }) => (
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
					Comments
				</h2>
				<ul className="comments">
				{
					comments.map((comment, i) => {
						return (
							<li>
								{comment.content}
								<footer>
									{dateFormat(new Date(comment.datetime), 'yyyy/mm/d')} by {comment.username} 
								</footer>								
							</li>
						);
					})
				}					
				</ul>
			</Col>

		</Row>
	</Grid>
);

export default PostDetailsView;
