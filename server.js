var express = require('express');
var app		= express();
var port	= 9000;
var passport= require('passport');
var flash 	= require('connect-flash');

var morgan 			= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser		= require('body-parser');
var session			= require('express-session');

var configDB = require('./config/database.js');
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.use(express.static(__dirname + '/resources'));

app.set('view engine', 'ejs');

// required for passport
app.use(session({
	secret		: 'oracle'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Load routes
require('./app/routes.js')(app, passport, configDB);

app.listen(port);
console.log('Listening on ', port);