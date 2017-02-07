import React from 'react';
import { Link } from 'react-router';
import dateFormat from 'dateformat';
import h2p from 'html2plaintext';
import { Grid, Row, Col } from 'react-bootstrap';

const MagicHomeView = props => (
	<div className="home">
		{ !props.authenticated && <button onClick={() => props.loginHandler()}>Login</button>}
		Hello World!
		<BlogsListView posts={props.posts} authenticated={props.authenticated} username={props.username}  />
	</div>
);

export default MagicHomeView;

const POST_PREVIEW_LENGTH = 140;

const BlogsListView = ({posts = [], authenticated = false, username}) => (
	<Grid>
	{
		posts.map((post, i) => {
			const datePosted = dateFormat(new Date(post.datetime), 'yyyy/mm/d');
			const plainContent = crop(h2p(post.content));
			
			const canEdit = authenticated && post.username == username;
		
			return (
				<Row key={i} className="show-grid">
					<Col xs={12} md={10} mdOffset={1} lg={8} lgOffset={2}>
						<Link to={`${datePosted}/${post.id}`} className="as-regular-text">
							<h1>
								{post.title}
							</h1>
							<p>
								{plainContent}
							</p>
						</Link>
						<footer>
							Posted by {post.username} on {datePosted} { canEdit && <Link to={`post/edit/${post.id}`}>Edit</Link> }
						</footer>					
					</Col>
				</Row>
			);
		})
	}
	</Grid>
);

const SENTENCE_SEPARATORS = ['.', '!', '?', ':', '-', ';'];

const crop = src => {
	let index = -1;
	for (let separator of SENTENCE_SEPARATORS) {
		index = src.indexOf(separator);
		if (index > 0) {
			break;
		}
	}
	if (index >= 0) {
		return src.substring(0, index - 1).trim() + '.';
	}
	
	if (src && src.length > POST_PREVIEW_LENGTH) {
		return src.substring(0, POST_PREVIEW_LENGTH - 3).trim() + '...';
	}
	return src;
};