import $ from 'jquery';
import postsConstants from '~/constants/postsConstants';
import blogMakers from '~/makers/blogMakers';

const delay = 1000;

export default {
	readPosts(
		orderBy = postsConstants.ORDER_BY, 
		ascending = postsConstants.ASCENDING, 
		skip = 0, 
		take = postsConstants.ITEMS_PER_PAGE) {
		
		const defer = $.Deferred();
		
		const ordered = blogMakers.posts.sort((a, b) => {
			if (orderBy == 'name') {
				return comparator(a, b, 'title', ascending);
			}
			else {
				return comparator(a, b, 'datetime', ascending);
			}
		});
		
		const result = ordered.slice(skip, skip + take);
		
		setTimeout(function() {
			defer.resolve({
				response: result
			});
		}, delay);
		
		return defer.promise();
	},
  
	createPost(title, content) {

	},

	updatePost(postId, title, content) {
		
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