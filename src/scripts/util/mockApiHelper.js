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
		
		setTimeout(function() {
			const index = blogMakers.posts.findIndex(p => p.id == postId);
			if (index != -1) {
				const post = blogMakers.posts[index];
				
				const diff = {
					title: title || post.title,
					content: content || post.content
				};
			
				const updated = update(post, { $merge: {
					title: diff.title,
					content: diff.content
				}});
				
				blogMakers.posts = update(blogMakers.posts, {
					$splice: [[index, 1, updated]]
				});
				
				defer.resolve({
					response: updated
				});				
			}
			else {
				defer.resolve({
					error: new Error('Invalid postId ' + postId)
				});				
			}
		

		}, delay);			
		
		return defer.promise();	
	},

	login(username, password) {
		const defer = $.Deferred();
		
		setTimeout(function() {
			const user = {
				username: 'mockuser',
				authenticated: true
			};
			
			const headers = {
				"X-AUTH-TOKEN": "OPIUO87HLIUP09345F9Y34FUOHGIUW43HT3P9G7UH43P78TF389Y4097T"
			};
		
			defer.resolve({
				data: user,
				textStatus: 200,
				jqXHR: {
					getResponseHeader: key => {
						return headers[key];
					}
				}
			});
		}, delay);		
		
		return defer.promise();					
	},
	
	createComment(username, postId, text) {
		const defer = $.Deferred();
		
		setTimeout(function() {
			const index = blogMakers.posts.findIndex(p => p.id == postId);
			
			if (index != -1) {
				const post = blogMakers.posts[index];
				
				const comment = {
					username: username,
					content: text,
					datetime: new Date().toISOString()
				};
				
				let updated = null;
				
				if (post.comments) {
					updated = update(post, { 
						comments: { $push: [comment] }
					});				
				}
				else {
					updated = update(post, { 
						comments: { $set: [comment] }
					});						
				}

				blogMakers.posts = update(blogMakers.posts, {
					$splice: [[index, 1, updated]]
				});
				
				const response = {
					postId: postId,
					username: comment.username,
					content: comment.content,
					datetime: comment.datetime
				};
				
				defer.resolve(response);
			}
			else {
				defer.resolve({
					error: new Error('Invalid postId ' + postId)
				});				
			}
		

		}, delay);			
		
		return defer.promise();	
	},	
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