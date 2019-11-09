const express = require('express')
const read = require('./read');
const deleteFn = require('./delete');

const router = express.Router();

router.get('/', read);
router.patch('/:id', update);
router.delete('/:id', deleteFn);

module.exports = router