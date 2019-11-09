const express = require('express')
const read = require('./read');

const router = express.Router();

router.get('/', read);

module.exports = router;