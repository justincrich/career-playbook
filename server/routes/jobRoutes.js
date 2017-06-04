'use strict';

var express = require("express");
var jobRoutes = express.Router();
var Job = require("../data_models/jobModel").Job;

//Param handler that gets the job when an ID is provided
jobRoutes.param("jID",function(req,res,next,id){
  Job.findById(id,function(err,doc){
    if(err){
      err.message="Job ID "+id+" not found";
      return next(err);
    }
    if(!doc){
      console.log("no doc");
      //Return a 404 not found error if there's no document
      err=new Error("Not Found");
      err.status=404;
      return next(err);
    }
    req.job=doc;
    return next();
  });
});

// GET /job
// Route to get all jobs
jobRoutes.get("/", function(req, res, next){
  Job.find({uID:req.uID}).sort({title:1}).exec(function(err,jobs){
    if(err) return next(err);
    res.json(jobs)
  });
});


// POST /job
// Route to create a job
jobRoutes.post("/", function(req,res,next){
  var job = new Job(req.body);
  job.save(function(err,job){
    if(err) return next(err);
    res.status(201);
    res.json(job);
  });
});

// GET /job
// Route to get ONE job
jobRoutes.get("/:jID", function(req,res,next){
  res.json(req.job);
});

// PUT /job
// Route to update ONE job
jobRoutes.put("/:jID", function(req, res, next){
  req.job.update(req.body,function(err,result){
    if(err) return next(err);
    res.json(req.body);
  });
});

// DELETE /company
// Route to delete ONE job
jobRoutes.delete("/:jID", function(req, res, next){
	req.job.remove(function(err){
    if(err) return next(err);
    Job.find({uID:req.uID}).sort({title:1}).exec(function(err,jobs){
      if(err) return next(err);
      res.json(jobs)
    });
  });
});

// // DELETE /job
// // Route to delete ALL jobs
// jobRoutes.delete("/", function(req, res, next){
// 	Job.remove({},function(err){
//       if(err) return next(err);
//       Job.find({uID:req.uID}).sort({name:1}).exec(function(err,jobs){
//         if(err) return next(err);
//         res.json(jobs)
//       });
//   });
// });

module.exports = jobRoutes;
