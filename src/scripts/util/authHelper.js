export default {
	isAuthenticated() {
		return !!localStorage.token;
	},
	
    logout(callback) {
		delete localStorage.token;
		if (callback) {
			callback();
		}
	}
};