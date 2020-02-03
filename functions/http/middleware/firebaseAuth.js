const firebaseAdmin = require('../../utils/firebase');

module.exports = async (req, res, next) => {
	let token = req.get('Authorization');
	token = token && token.replace('Bearer', '').replace(' ', '');
	
	if(!token) {
		return next({code: 'FORBIDDEN', data: 'Missing token'});
	}
	
	let user;
	try {
		user = await firebaseAdmin.auth().verifyIdToken(token);
	} catch(e) {	
		return next({code: 'FIREBASE_ERROR', data: e});
	}

	req.firebaseUser = user;

	return next();
};