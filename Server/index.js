const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const dotenv = require('dotenv');

/* ******************************************* */

const app = express();
const port = 3000;

/* ******************************************* */

// dotenv
dotenv.config();

// cors
app.use(cors());

// cookie-parser
app.use(cookieParser());

// body-parser
app.use(bodyParser.json());

// passport
app.use(passport.initialize());
app.use(passport.session());

/* ******************************************* */

// Internal modules
require('./app/auth')(passport);
require('./routes/auth-api')(app, passport);
require('./routes/main-api')(app, passport);

// Initialize
app.listen(port);
console.log("Port: " + port);

/* ******************************************* */