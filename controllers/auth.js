//Requires and global variables
var express = require('express');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();

//Routes
router.get('/login', function(req, res) {
    res.render('loginForm');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    successFlash: 'Welcome to Bullseye! You are succussfully logged in.',
    failureRedirect: '/auth/login',
    failureFlash: 'Try again.'
}));

router.get('/signup', function(req, res) {
    res.render('signupForm');
});

router.post('/signup', function(req, res, next) {
    db.user.findOrCreate({
        where: { email: req.body.email },
        defaults: {
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'password': req.body.password
        }
    }).spread(function(user, wasCreated) {
        if (wasCreated) {
            //Yes!
            passport.authenticate('local', {
                successRedirect: '/profile',
                successFlash: 'Your account is created and you are logged in!',
                failureRedirect: '/login',
                failureFlash: 'Unknown error, please re-login.'
            })(req, res, next);
        } else {
            //No!
            req.flash('error', 'Email already exists! Please login.');
            res.redirect('/auth/login');
        }
    }).catch(function(error) {
        req.flash('error', error.message);
        res.redirect('/auth/signup');
    })
});

router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'You logged out, see ya next time!');
    res.redirect('/');
});

router.get('/callback/facebook', passport.authenticate('facebook', {
    successRedirect: '/profile',
    successFlash: 'You have logged in with Facebook',
    failureRedirect: '/auth/login',
    failureFlash: 'You tried, but Facebook said no.'
}));


//FACEBOOK AUTH SECTION

router.get('/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));


//Export
module.exports = router;
