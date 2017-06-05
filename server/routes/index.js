const routes = require('express').Router();
const users = require('./userRoutes');
const auth = require('./authRoutes');

routes.use('/user',users);
routes.use('/auth',auth);

routes.get('/',(req,res)=>{
  res.status(200).json({message:'Connected'});
});

module.exports = routes;
