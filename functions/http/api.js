const express        = require('express');
const cors           = require('cors');
const {handleErrors} = require('./middleware');
const router         = require('./router');
const bodyParser     = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: true }));
app.use('/', router);
app.use(handleErrors);

module.exports = app;