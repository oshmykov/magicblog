import React from 'react';

const MagicHomeView = props => (
	<div>
		Hello World!
		<BlogsListView items={props.blogs} />
	</div>
);

export default MagicHomeView;

const BlogsListView = ({items = []}) => (
	<ul>
	{
		items.map((item, i) => {
			return (
				<li key={i}>
					<header>
						{item.title}
					</header>
					<div>
						{item.content}
					</div>
					<footer>
						{item.datetime} by {item.username}
					</footer>
				</li>
			);
		})
	}
	</ul>
);