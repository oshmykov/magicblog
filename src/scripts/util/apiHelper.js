import $ from 'jquery';
import mockApiHelper from '~/util/mockApiHelper';

const apiBaseUrl = 'http://google.com';

export const ajaxHandler = (method) => method()
	.then((data, textStatus, jqXHR) => {
		return { data, textStatus, jqXHR };
	})
	.fail((jqXHR, textStatus, errorThrown) => {
		return { jqXHR, textStatus, errorThrown };
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
	},
	
	login(username, password) {
		return mockApiHelper.login(username, password);
	
		return($.ajax({
			type: 'POST',
			url: `${apiBaseUrl}/users/login`,
			data: {
				username: username, 
				password: password
			}
		}));		
	},
	
	createComment(username, postId, text) {
		return mockApiHelper.createComment(username, postId, text);
		
		const data = { username, text };
	
		return($.ajax({
			type: 'POST',
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