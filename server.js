/*Server side imports*/
const express = require('express');
const app = express();
const http = require('http');
const debug = require('debug')('up899244:server')

/*Google oAuth imports*/
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


/*Main paths for the files*/
const path = require('path');
app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, 'public')));

// Static folder
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

/*Mongoose database configuration for Google oAuth*/
/*const configDB = require('./database/oAuthDatabase.js');
mongoose.connect(configDB.url,{
    useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true
});*/


/*Google oAuth imports*/
require('./googleOAuth/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'j6fgjh25kl',
    saveUninitialized: true,
    resave: true}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./googleOAuth/routes.js')(app, passport);


/*Server*/

/*Get port from environment and store in Express.*/
const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

/*Create HTTP server.*/
const server = http.createServer(app);

/*Listen on provided port, on all network interfaces.*/

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/*Normalize a port into a number, string, or false.*/

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**Event listener for HTTP server "error" event.*/

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/*Event listener for HTTP server "listening" event.*/

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

