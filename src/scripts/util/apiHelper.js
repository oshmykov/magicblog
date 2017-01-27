import $ from 'jquery';
import postsConstants from '~/constants/postsConstants';
import mockApiHelper from '~/util/mockApiHelper';

const apiBaseUrl = 'http://google.com';

export const ajaxHandler = (method) => method()
	.then(respone => response)
	.fail((jqXHR, textStatus, errorThrown) => {
		return jqXHR;
	});

export const apiHelper = {
	readPosts(
		orderBy = postsConstants.ORDER_BY, 
		ascending = postsConstants.ASCENDING, 
		skip = 0, 
		take = postsConstants.ITEMS_PER_PAGE) {
		
		return mockApiHelper.readPosts(orderBy, ascending, skip, take);
	
		return ($.ajax({
			type: 'GET',
			url: `${apiBaseUrl}/posts/${skip}/${take}`
		}));
	},
  
	createPost(title, content) {
		const data = { title, content };

		return($.ajax({
			type: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			url: `${apiBaseUrl}/posts`,
			data: JSON.stringify(data),
			dataType: "json"
		}));
	},

	updatePost(postId, title, content) {
		const data = { title, content };
		return($.ajax({
			type: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			url: `${apiBaseUrl}/posts/${postId}`,
			data: JSON.stringify(data),
			dataType: "json"
		}));		
	}
};