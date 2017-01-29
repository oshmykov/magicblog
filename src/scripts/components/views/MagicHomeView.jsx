import React from 'react';
import { Link } from 'react-router';
import dateFormat from 'dateformat';

const MagicHomeView = props => (
	<div>
		Hello World!
		<BlogsListView items={props.posts} />
	</div>
);

export default MagicHomeView;

const BlogsListView = ({items = []}) => (
	<ul>
	{
		items.map((item, i) => {
			const datePosted = dateFormat(new Date(item.datetime), 'yyyy/mm/d');
		
			return (
				<li key={i}>
					<header>
						{item.title}
					</header>
					<div>
						{item.content}
					</div>
					<footer>
						{datePosted} by {item.username} 
						<Link to={`${datePosted}/${item.id}`}>
						  View
						</Link>						
					</footer>
				</li>
			);
		})
	}
	</ul>
);