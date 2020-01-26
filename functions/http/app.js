require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const router = require('./router');
const handleErrors = require('./middleware/handleError');
const app = express();
const cors = require('cors')
 
app.use(cors())
app.use(bodyParser.json());
app.use(router);
app.use(handleErrors);

module.exports = app;