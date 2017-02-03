import React from 'react';
import { Link } from 'react-router';
import dateFormat from 'dateformat';
import h2p from 'html2plaintext';

const MagicHomeView = props => (
	<div>
		{ !props.authenticated && <button onClick={() => props.loginHandler()}>Login</button>}
		Hello World!
		<BlogsListView posts={props.posts} authenticated={props.authenticated} username={props.username}  />
	</div>
);

export default MagicHomeView;

const POST_PREVIEW_LENGTH = 140;

const BlogsListView = ({posts = [], authenticated = false, username}) => (
	<ul>
	{
		posts.map((post, i) => {
			const datePosted = dateFormat(new Date(post.datetime), 'yyyy/mm/d');
			const plainContent = crop(h2p(post.content));
			
			const canEdit = authenticated && post.username == username;
		
			return (
				<li key={i}>
					<header>
						{post.title}
					</header>
					<div>
						{plainContent}
					</div>
					<footer>
						{datePosted} by {post.username} 
						<Link to={`${datePosted}/${post.id}`}>
						  View
						</Link>	
						{ canEdit && <Link to={`post/edit/${post.id}`}>Edit</Link> }						
					</footer>
				</li>
			);
		})
	}
	</ul>
);

const crop = src => {
	if (src && src.length > POST_PREVIEW_LENGTH) {
		return src.substring(0, POST_PREVIEW_LENGTH - 3) + '...';
	}
	return src;
};