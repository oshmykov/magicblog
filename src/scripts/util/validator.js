export default {
	validate(object, schema) {
		const errors = {};
	
		if (schema) {
			for (let key in schema) {
				const prop = schema[key];
					
				const messages = [];
				
				if (prop.required) {
					if (key in object) {
						if (!object[key]) {
							messages.push(`${prop.fieldName} is required`);
						}
					
						if (prop.type) {
							if (typeof object[key] !== prop.type) {
								messages.push(`${prop.fieldName} is invalid`);
							}
						}
					}
					else {
						messages.push(`${prop.fieldName} is required`);
					}
				}
				
				if (messages.length > 0) {
					errors[key] = {
						messages: messages,
						state: 'error'					
					};			
				}
			}
		}
		
		return errors;
	},
	
	isValid(errors) {
		if (errors) {
			for (let key in errors) {
				const error = errors[key];
				if (error) {
					if (Array.isArray(error.messages) && error.messages.length > 0) {
						return false;
					}					
				}
			}
		}
		
		return true;
	}
};