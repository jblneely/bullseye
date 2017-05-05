//All the requires and global variables
require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('./config/passportConfig');
var isLoggedIn = require('./middleware/isLoggedIn');
var morgan = require('morgan');
var db = require('./models');

var app = express();

//Set and Use Statements
app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
});


//Routes
app.get('/', function(req, res) {
    res.render('home');
});



//Controllers
app.use('/auth', require('./controllers/auth'));
app.use('/profile', isLoggedIn, require('./controllers/profile'));


//Listen
var server = app.listen(process.env.PORT || 3000);

module.exports = server;
