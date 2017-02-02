import $ from 'jquery';
import mockApiHelper from '~/util/mockApiHelper';

const apiBaseUrl = 'http://google.com';

export const ajaxHandler = (method) => method()
	.then(respone => response)
	.fail((jqXHR, textStatus, errorThrown) => {
		return jqXHR;
	});

export const apiHelper = {
	readPosts(page = 0) {
		return mockApiHelper.readPosts(page);
	
		return ($.ajax({
			type: 'GET',
			url: `${apiBaseUrl}/posts/${page}`
		}));
	},
	
	readPost(postId) {
		return mockApiHelper.readPost(postId);
	
		return ($.ajax({
			type: 'GET',
			url: `${apiBaseUrl}/post/${postId}`
		}));
	},	
  
	createPost(title, content) {
		return mockApiHelper.createPost(title, content);
	
		const data = { title, content };

		return($.ajax({
			type: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			url: `${apiBaseUrl}/posts`,
			data: JSON.stringify(data),
			dataType: 'json'
		}));
	},

	updatePost(postId, title, content) {
		return mockApiHelper.updatePost(postId, title, content);
	
		const data = {};
		if (title) {
			data.title = title;
		}
		if (content) {
			data.content = content;
		}
		
		return($.ajax({
			type: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			url: `${apiBaseUrl}/posts/${postId}`,
			data: JSON.stringify(data),
			dataType: 'json'
		}));		
	}
};