'use strict';

var express = require("express");
var compRoutes = express.Router();
var Company = require("../data_models/compModel").Company;
var mid = require('../middleware');

//Param handler that gets the company when an ID is provided
compRoutes.param("cID",function(req,res,next,id){
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
compRoutes.get("/", mid.requiresLogin, function(req, res, next){
  Company.find({uID:req.uID}).sort({name:1}).exec(function(err,companies){
    if(err) return next(err);
    res.json(companies)
  });
	//res.json({response: "GET all companies"});
});

// GET /companies/gdID
// Route to get gdIDs for all companies in storage
compRoutes.get("/gdid", mid.requiresLogin, function(req, res, next){
  Company.find({uID:req.uID}).sort({name:1}).exec(function(err,companies){
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
compRoutes.post("/", mid.requiresLogin, function(req,res,next){
  var company = new Company(req.body);
  company.save(function(err,company){
    if(err) return next(err);
    res.status(201);
    res.json(company);
  });
});

// GET /company
// Route to get ONE company
compRoutes.get("/:cID", mid.requiresLogin, function(req,res,next){
  res.json(req.company);
});

// PUT /company
// Route to update ONE company
compRoutes.put("/:cID", mid.requiresLogin, function(req, res, next){
  req.company.update(req.body,function(err,result){
    if(err) return next(err);
    res.json(req.body);
  });
});

// DELETE /company
// Route to delete ONE company
compRoutes.delete("/:cID", mid.requiresLogin, function(req, res, next){
	req.company.remove(function(err){
    if(err) return next(err);
    Company.find({uID:req.uID}).sort({name:1}).exec(function(err,companies){
      if(err) return next(err);
      res.json(companies)
    });
  });
});

// DELETE /company
// Route to delete ALL companies
compRoutes.delete("/", mid.requiresLogin, function(req, res, next){
	Company.remove({},function(err){
      if(err) return next(err);
      Company.find({uID:req.uID}).sort({name:1}).exec(function(err,companies){
        if(err) return next(err);
        res.json(companies)
      });
  });
});

module.exports = compRoutes;
