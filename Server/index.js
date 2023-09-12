const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const session = require('express-session');

/* ***************************************** */

const app = express();
const port = process.env.PORT || 3000;

/* ***************************************** */

// dotenv
dotenv.config();

// cors
app.use(cors());

// cookie-parser
app.use(cookieParser());

// body-parser
app.use(bodyParser.json());

// express-session
app.use(session({
  secret: 'your secret here',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

/* ***************************************** */

// Internal modules
require('./app/auth')(passport);
require('./routes/auth-api')(app, passport);
require('./routes/main-api')(app, passport);

// Create HTTP server
const httpServer = http.createServer(app);

// Initialize web socket server
require('./app/ws')(app, httpServer, passport);

// Initialize HTTP server
httpServer.listen(port);
console.log("Port: " + port);

/* ***************************************** */