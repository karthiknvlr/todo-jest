const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const routes = require('./src/routes/index');
//Database connections
if (!(process.env.NODE_ENV == 'test')) {
	require('./config/db');
}

// Initializing express app
const app = express();

// Adds helmet middleware
app.use(helmet());

// Body Parser Configuration
app.use(
	bodyParser.json({
		// to support JSON-encoded bodies
		limit: '1mb'
	})
);

app.use(
	bodyParser.urlencoded({
		// to support URL-encoded bodies
		limit: '1mb',
		extended: true
	})
);

// Router Initialization
app.use(routes);

module.exports = app;
