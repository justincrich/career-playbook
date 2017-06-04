'use strict';
const userRoutes = require('express').Router();
const compRoutes = require('./compRoutes');
const jobRoutes = require('./jobRoutes');
var User = require("../data_models/userModel").User;

//Param handler that gets the user when an ID is provided
userRoutes.param("uID",function(req,res,next,id){
  User.findById(id,function(err,doc){

    if(err) return next(err);
    if(!doc){
      console.log("no doc");
      //Return a 404 not found error if there's no document
      err=new Error("This user does not exist.");
      err.status=404;
      return next(err);
    }
    req.user=doc;
    req.uID =id;
    return next();
  });
});

userRoutes.use('/:uID/companies',compRoutes);
userRoutes.use('/:uID/jobs',jobRoutes);

userRoutes.get('/',(req,res)=>{
  User.find({}).sort({email:1}).exec(function(err,users){
    if(err) return next (err);
    res.status(200).json(users);
  });
});

userRoutes.get('/:uID',(req,res)=>{
  res.status(200).json(req.user);
});

// DELETE /company
// Route to delete ONE job
userRoutes.delete("/:uID", function(req, res, next){
  var email = req.user.email;
	req.user.remove(function(err){
    if(err) return next(err);
    res.status(200).json({message: email+" Removed"});
  });
});

userRoutes.put("/:uID",function(req,res,next){
  var updates = {};
  if(req.body.password){
    if (req.body.password !== req.body.confirmPassword) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      return next(err);
    }else{
      updates.password=req.body.password;
    }
  }
  if(req.body.email){
    updates.email=req.body.email;
  }
  if(req.body.name){
    updates.name = req.body.name;
  }
  req.user.update(updates,function(err,result){
    if(err) return next(err);
    res.json(req.body);
  });
});

// POST /users
userRoutes.post("/", function(req,res,next){
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
        });
      }else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }

});

module.exports = userRoutes;
