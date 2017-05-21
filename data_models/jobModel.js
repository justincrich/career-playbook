'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var JobSchema = new Schema({
  title:String,
  url:{type:String,default:""},
  companyName:String,
  companyID:String,
  note:{type:String,default:""},
});


//set the company schema
var Job = mongoose.model("Job",JobSchema);
module.exports.Job = Job;
