import React from 'react';
import dateFormat from 'dateformat';

const PostDetailsView = ({title, username, content, datetime}) => (
	<article>
		<header>
			<h2>
				{title} by <i>{username}</i>
			</h2>
		</header>
		<p>
			{content}
		</p>
		<footer>Date created: {dateFormat(new Date(datetime), 'fullDate')}</footer>
	</article>
);

export default PostDetailsView;
