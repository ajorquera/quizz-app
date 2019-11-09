const express   = require('express')
const users     = require('./users');
const questions = require('./questions');

const router = express.Router();

router.use('/users', users);
router.use('/questions', questions);

module.exports = router;