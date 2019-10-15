import express from 'express';
import Cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
const app = express();



const API_PORT = process.env.API_PORT || 9000;

app.use(Cors());
app.use(require('sanitize').middleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

require('./routes/createUser')(app);
require('./routes/getData')(app);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

module.exports = app;
