const express  = require('express')
const read     = require('./read');
const deleteFn = require('./delete');
const update   = require('./update');
const create   = require('./create');

const router = express.Router();

router
    .get('/', read)
    .post('/', create)
    .patch('/:id', update)
    .delete('/:id', deleteFn);

module.exports = router