const express   = require('express')
const helloWorld = require('./controllers/helloWorld');

const router = express.Router();

router.use('/hello', helloWorld);

module.exports = router;