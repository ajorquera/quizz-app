const express   = require('express')
const users     = require('./users');
const questions = require('./questions');

const router = express.Router();

router.route('/users', users);
router.route('/questions', questions);

module.exports = router;