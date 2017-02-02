import React from 'react';
import dateFormat from 'dateformat';
import ReactMarkdown from 'react-markdown';

const PostDetailsView = ({title, username, content, datetime}) => (
	<article>
		<header>
			<h2>
				{title} by <i>{username}</i>
			</h2>
		</header>
		<div dangerouslySetInnerHTML={{__html: content}}>
		</div>
		<footer>Date created: {dateFormat(new Date(datetime), 'fullDate')}</footer>
	</article>
);

export default PostDetailsView;
