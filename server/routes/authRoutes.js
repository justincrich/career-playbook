'use strict';

var express = require("express");
var passport = require('passport');
var authRoutes = express.Router();
var mid = require('../middleware');
var User = require("../data_models/userModel").User;



// POST /register
authRoutes.post("/register", function(req,res,next){
  if(req.body.email &&
      req.body.password &&
      req.body.name){
        if (req.body.password !== req.body.confirmPassword) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }
        var user = new User(req.body);
        user.save(function(err,user){
          if(err) return next(err);
          res.status(201);
          res.json(user);
          req.session.userId = user._id;
        });
      }else {
        var err = new Error('You missed a field ... try again!.');
        err.status = 400;
        return next(err);
    }

});

//POST /Login
authRoutes.post('/login', function(req, res, next) {

  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      }  else {
        //console.log("doing login");
        req.session.userId = user._id;
        res.status(200).json({
          user:user,
          message:'Authenticated',
          auth:"1"

        });
      }
    });
  } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    err.auth=0;
    return next(err);
  }
});

// GET /logout
authRoutes.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        res.status(200).json({
          message:'Logged Out',
          auth:"0"
        });
      }
    });
  }
});

//GET /auth/login/facebook
authRoutes.get('/login/facebook',
  passport.authenticate('facebook', {scope: ["email"]}));

//GET /auth/facebook/return
authRoutes.get('/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {



    // Successful authentication, redirect home.
    res.redirect('/api');
  });

//GET /auth/logout
authRoutes.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = authRoutes;
