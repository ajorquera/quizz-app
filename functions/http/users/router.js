const express = require('express')
const read = require('./read');
const update = require('./update');
const deleteFn = require('./delete');

const router = express.Router();

router
    .get('/', read)
    .patch('/:id', update)
    .delete('/:id', deleteFn);

module.exports = router