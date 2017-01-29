export default {
	getPageNumber(param) {
		const page = parseInt(param);

		if (page && Number.isInteger(page) && page > 1) {
			return page - 1;
		}
		return 0;		
	},
	
	getDate(isoDate) {
		const date = new Date(isoDate);
		console.log('date', date);
		
		return `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;
	}
};