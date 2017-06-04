const routes = require('express').Router();
const users = require('./userRoutes');

routes.use('/user',users);

routes.get('/',(req,res)=>{
  res.status(200).json({message:'Connected'});
});

module.exports = routes;
