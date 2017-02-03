import React from 'react';
import { Link } from 'react-router';
import dateFormat from 'dateformat';
import h2p from 'html2plaintext';

const MagicHomeView = props => (
	<div>
		{ !props.authenticated && <button onClick={() => props.loginHandler()}>Login</button>}
		Hello World!
		<BlogsListView items={props.posts} />
	</div>
);

export default MagicHomeView;

const POST_PREVIEW_LENGTH = 140;

const BlogsListView = ({items = []}) => (
	<ul>
	{
		items.map((item, i) => {
			const datePosted = dateFormat(new Date(item.datetime), 'yyyy/mm/d');
			const plainContent = crop(h2p(item.content));
			
		
			return (
				<li key={i}>
					<header>
						{item.title}
					</header>
					<div>
						{plainContent}
					</div>
					<footer>
						{datePosted} by {item.username} 
						<Link to={`${datePosted}/${item.id}`}>
						  View
						</Link>	
						<Link to={`post/edit/${item.id}`}>
						  Edit
						</Link>						
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