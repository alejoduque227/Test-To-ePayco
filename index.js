/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');

const app = express();
const http = require('http');

const server = http.Server(app);
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('./Config/global');
const cors = require('cors');


app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

/**
 * Secure Policy
 */
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'ePayco' }));
app.use(helmet.ieNoOpen());
app.use(helmet.xssFilter());

app.use(require('./Http/'));

/**
 * Not route found handler.
 */
app.use((req, res, next) => {
    const err = new Error('Content not Found');
    err.status = 404;
    err.errors = {
        url: [`The ${req.originalUrl} not exist`],
    };
    next(err);
});

/**
 * Error handler.
 */
app.use((error, req, res, next) => {
    const err = error;
    if (!err.status) {
        console.error(err);
    }

    if (env.env === 'production' && !err.status) {
        err.message = 'Try Later';
    }
    err.errors = err.errors || { url: [`The ${req.originalUrl} endpoint will answer later`] };
    err.status = err.status || 500;
    res.statusCode = err.status;
    res.json({
        message: err.message,
        errors: err.errors,
        status: err.status,
    }).end();
});

/**
 * Declare server and start listen port.
 */
const port = global.env.port;

app.set('port', port);

server.listen(port);

server.on('error', () => {

});

server.on('listening', () => {
});
