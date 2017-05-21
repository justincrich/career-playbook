'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
  gdID:{type:String,default:"NA"},
  name:String,
  website:{type:String,default:""},
  logo:{type:String,default:"./Media/company.png"},
  overallRating:{type:String,default:""},
  ratingDescription:{type:String,default:""},
  industry:{type:String,default:""}
});


//set the company schema
var Company = mongoose.model("Company",CompanySchema);
module.exports.Company = Company;


// this.id=id;
// this.name=name;
// this.website=website;
// this.logo=logo;
// this.overallRating=overallRating;
// //overall employee sentiment of the company (Glassdoor)
// this.ratingDescription=ratingDescription;
// this.industry=industry;
