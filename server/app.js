'use strict';
var express = require("express");
var app = express();
var jsonParser = require("body-parser").json;
var compRoutes = require("./compRoutes");
var jobRoutes = require("./jobRoutes");
var logger = require("morgan");

app.use(logger("dev")); //provides status codes for API
app.use(jsonParser());//sets up the JSON parser

//--------------DATABASE ACTIVATION---------------
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/qa");
var db = mongoose.connection;
db.on("error",function(err){
  console.error("connection error: ",err);
});

db.once("open",function(){
  console.log("db connection successful");
});

//--------------END DATABASE----------------------

// -------------ROUTERS---------------------------
//Company Routes
app.use("/companies",compRoutes);

app.use("/jobs",jobRoutes);

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
var port = process.env.PORT || 3030;

app.listen(port, function(){
  console.log("I'm listening on port ",port);
});
