const {
	INTERNAL_SERVER_ERROR,
	FORBIDDEN,
	UNAUTHORIZED,
	NOT_FOUND,
	UNPROCESSABLE_ENTITY
} = require('http-status-codes');

const ERRORS = {
	VALIDATION_ERROR: {
		httpStatus: UNPROCESSABLE_ENTITY,
		message: 'The data is invalid'
  },
  FORBIDDEN: {
		httpStatus: FORBIDDEN,
		message: 'You don have access to this resource'
	},
	UNATHORIZED: {
		httpStatus: UNAUTHORIZED,
		message: 'You are not allowed to do this action'
	},
	NOT_FOUND: {
		httpStatus: NOT_FOUND,
		message: 'Not found entity'
  },
  FIREBASE_ERROR: {
		httpStatus: INTERNAL_SERVER_ERROR,
		message: 'Something went wrong with firebase'
  },
  UNKNOWN: {
		httpStatus: INTERNAL_SERVER_ERROR,
		message: 'Something went wrong and we don\'t know what it is :('
	}
};

Object.keys(ERRORS).forEach(key => {
	ERRORS[key].code = key;
});

module.exports = ERRORS;