import $ from 'jquery';
import blogMakers from '~/makers/blogMakers';
import update from 'react-addons-update';

const delay = 1000;
const POSTS_PER_PAGE = 10;

export default {
	readPosts(page = 0) {
		const defer = $.Deferred();
		
		const ordered = blogMakers.posts.sort((a, b) => {
			return comparator(a, b, 'datetime', false);
		});
		const skip = page * POSTS_PER_PAGE;
		const take = POSTS_PER_PAGE;
		const result = ordered.slice(skip, skip + take);
		
		setTimeout(function() {
			defer.resolve({
				response: result
			});
		}, delay);
		
		return defer.promise();
	},
	
	readPost(postId) {
		const defer = $.Deferred();
	
		const filtered = blogMakers.posts.filter(p => p.id == postId);
		
		let result = null;
		if (filtered && filtered.length > 0) {
			result = filtered[0];
		}
		
		setTimeout(function() {
			defer.resolve({
				response: result
			});
		}, delay);
		
		return defer.promise();		
	},	
  
	createPost(title, content) {
		const defer = $.Deferred();
		
		setTimeout(function() {
			const newPost = {
				id: title.toLowerCase().replace(' ', '-'),
				title: title,
				content: content,
				username: 'mockuser',
				datetime: new Date().toISOString()
			};
			
			blogMakers.posts.push(newPost);
		
			defer.resolve({
				response: newPost
			});
		}, delay);		
		
		return defer.promise();	
	},

	updatePost(postId, title, content) {
		const defer = $.Deferred();
		
		
		
		return defer.promise();	
	}	
};

const comparator = (item1, item2, fieldName, ascending = true) => {
	let result = 0;
	if (item1[fieldName] < item2[fieldName]) {
		result = -1;
	}
	else if (item1[fieldName] > item2[fieldName]) {
		result = 1;
	}
	
	return ascending ? result : -result;
};