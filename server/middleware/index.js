function loggedOut(req,res,next){
  if(req.session && req.session.userId){
    req.loggedIn = true;
    return next();
  }
  req.loggedIn = false;
  return next();
}

function requiresLogin(req,res,next){
  if(req.session && req.session.userId){
    return next();
  }else if (req.user.id){
    return next();
  }else{
    var err = new Error('Not Authenticated. Please Login.');
    err.status=401;
    return next(err);
  }
}

module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
