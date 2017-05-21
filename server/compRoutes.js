'use strict';

var express = require("express");
var router = express.Router();
var Company = require("../data_models/compModel").Company;

//Param handler that gets the company when an ID is provided
router.param("cID",function(req,res,next,id){
  Company.findById(id,function(err,doc){

    if(err) return next(err);
    if(!doc){
      console.log("no doc");
      //Return a 404 not found error if there's no document
      err=new Error("Not Found");
      err.status=404;
      return next(err);
    }
    req.company=doc;
    return next();
  });
});

// GET /companies
// Route to get all companies
router.get("/", function(req, res, next){
  Company.find({}).sort({name:1}).exec(function(err,companies){
    if(err) return next(err);
    res.json(companies)
  });
	//res.json({response: "GET all companies"});
});

// GET /companies/gdID
// Route to get gdIDs for all companies in storage
router.get("/gdid", function(req, res, next){
  Company.find({}).sort({name:1}).exec(function(err,companies){
    if(err) return next(err);
    var compGDID = {};
    companies.forEach(function(company){
      compGDID[company.gdID] = company.name;
    });
    res.json(compGDID);
  });
	//res.json({response: "GET all companies"});
});

// POST /company
// Route to create a company
router.post("/", function(req,res,next){
  var company = new Company(req.body);
  if(company.logo === ""){
    company.logo = "./Media/company.png"; //save default pic if no pic exists NOT WORKING
  }
  company.save(function(err,company){
    if(err) return next(err);
    res.status(201);
    res.json(company);
  });
});

// GET /company
// Route to get ONE company
router.get("/:cID", function(req,res,next){
  res.json(req.company);
});

// PUT /company
// Route to update ONE company
router.put("/:cID", function(req, res, next){
  req.company.update(req.body,function(err,result){
    if(err) return next(err);
    res.json(req.body);
  });
});

// DELETE /company
// Route to delete ONE company
router.delete("/:cID", function(req, res, next){
	req.company.remove(function(err){
    if(err) return next(err);
    Company.find({}).sort({name:1}).exec(function(err,companies){
      if(err) return next(err);
      res.json(companies)
    });
  });
});

// DELETE /company
// Route to delete ALL companies
router.delete("/", function(req, res, next){
	Company.remove({},function(err){
      if(err) return next(err);
      Company.find({}).sort({name:1}).exec(function(err,companies){
        if(err) return next(err);
        res.json(companies)
      });
  });
});

module.exports = router;
