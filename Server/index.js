const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var cors = require('cors');

/* ******************************************* */

const app = express();
const port = 3000;

/* ******************************************* */

// cors
app.use(cors());

// cookie-parser
app.use(cookieParser());

// body-parser
app.use(bodyParser.json());

// express-session
app.use(session({
    secret: 'hYvaAklVxj7odxW',
    resave: true,
    saveUninitialized: true
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

// connect-flash
app.use(flash());


/* ******************************************* */

// Internal modules
require('./app/auth')(passport);
require('./routes/auth-api')(app, passport);
require('./routes/web')(app);

// Initialize
app.listen(port);
console.log("Port: " + port);

/* ******************************************* */