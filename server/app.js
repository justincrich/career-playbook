'use strict';
require('dotenv').config();
var cookieParser = require('cookie-parser');
var express = require("express");
var app = express();
var jsonParser = require("body-parser").json;
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var routes = require('./routes');
var logger = require("morgan");
//variables for authentication
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var User = require("./data_models/userModel").User;
app.use(logger("dev",{
  skip:(req,res)=>{
    return req.url == '/json'
  }
}));
app.use(jsonParser());//sets up the JSON parser

//--------------ENABLE PASSPORT---------------
function generateOrFindUser(accessToken, refreshToken, profile, done){
  if(profile.emails[0]) {
    User.findOneAndUpdate(
      { email: profile.emails[0].value },
      {
        name: profile.displayName || profile.username,
        email: profile.emails[0].value,
        photo: profile.photos[0].value
      },
      {
        upsert: true
      },
    done
  );
  } else {
    var noEmailError = new Error("Your email privacy settings prevent you from signing into Bookworm.");
    done(noEmailError, null);
  }
}

passport.use(new FacebookStrategy({
  clientID: process.env.REACT_APP_FB_ID,
  clientSecret: process.env.REACT_APP_FB_SECRET,
  callbackURL: "http://localhost:8080/api/auth/facebook/return",
  profileFields: ['id', 'displayName', 'photos', 'email']
},
  generateOrFindUser)
);

passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(userId, done){
	User.findById(userId, function(err,user){
    done(err,user);
  });
});

//--------------DATABASE ACTIVATION---------------
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/careerplaybook");
var db = mongoose.connection;
db.on("error",function(err){
  console.error("connection error: ",err);
});

db.once("open",function(){
  console.log("db connection successful");
});

//--------------END DATABASE----------------------

//--------------ACTIVATE SESSION----------------------
app.use(session({
  secret:'pug love',
  resave: true,
  saveUninitialized:true,
  store:new MongoStore({
    mongooseConnection:db
  })
}));
app.use(cookieParser());
//Initialize Passport.js
app.use(passport.initialize());

//Restore session
app.use(passport.session());

//make user ID available in templates
// app.use(function(req,res,next){
//   res.locals.currentUser = req.session.userId;
//   next();
// });

// -------------ROUTERS---------------------------

app.use("/api",routes);



// app.use("/companies",compRoutes);
//
// app.use("/jobs",jobRoutes);

// catch 404 and forward to error handler
app.use(function(req,resp,next){
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//ENABLE BROWSERS TO ACCESS THIS API FROM ANY DOMAIN
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*"); //tells which origins are allowed in the requests
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  if(req.method==="OPTIONS"){
    res.header("Access-Control-Allow-Methods","PUT,POST,DELETE");
    return res.status(200).json({});
  }
  next();

});


//Error handler, always have 4 params ... how express knows its an error
app.use(function(err,req,res,next){
  res.status(err.status || 500);
  res.json({
    error:{
      message:err.message
    }
  });
});


// port to serve app on
var port = process.env.PORT || 8080;

app.listen(port, function(){
  console.log("I'm listening on port ",port);
});
