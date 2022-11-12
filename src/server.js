// Get the necessary packages
import express from 'express';
import bodyParser from 'body-parser';
import config from './utils/config.js';
import routes from './controllers/index.js'
import seedLoader from './utils/middleware-seed.js';

const { json, urlencoded } = bodyParser;
const app = express();

// Initial seed
app.use(seedLoader);

// Middlewares
app.use(json());
app.use(urlencoded({extended: false}));

// Using routes and middlewares
app.use(routes);

app.listen(config.server_port, function() {
    console.log("The App is running on port " + config.server_port);
})
