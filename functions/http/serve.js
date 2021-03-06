const bodyParser = require('body-parser');

const port = 8080;

const funcName = process.argv[2];
const app = require(`./${funcName}`);

const message = `${funcName} endpoints are listening on port ${port}!. Click on http://localhost:${port}`;

app.listen(port, () => console.log(message));