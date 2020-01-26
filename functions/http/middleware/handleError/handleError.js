const errors = require('./errors');

module.exports = (err, req, res, next) => {
	let errorObj = errors[err.code];
	if(!errorObj) {
		errorObj = errors.UNKNOWN;
	}

	let data;
	
	if(err.data) {
		data = err.data;
	}

	const {code, message, httpStatus} = errorObj;

	const response = {message, code, data};

	if(httpStatus >= 500) {
		console.error(response);
	} else if(httpStatus >= 400) {
		console.warn(response);
	}

	res.status(httpStatus).json(response);
};