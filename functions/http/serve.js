const bodyParser = require('body-parser');

const port = 8080;

const funcName = process.argv[2];
const app = require(`./${funcName}`);

app.use(bodyParser.json());

const message = `${funcName} endpoints are listening on port ${port}!`;

app.listen(port, () => console.log(message));