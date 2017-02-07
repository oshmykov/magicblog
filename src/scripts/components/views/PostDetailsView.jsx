import React from 'react';
import dateFormat from 'dateformat';
import ReactMarkdown from 'react-markdown';
import { Grid, Row, Col } from 'react-bootstrap';

const PostDetailsView = ({title, username, content, datetime}) => (
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
	</Grid>
);

export default PostDetailsView;
