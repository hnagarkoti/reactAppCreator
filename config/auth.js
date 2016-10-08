// config/auth.js
var express = require('express');
var router = express.Router();
var passport = require('passport');
var Auth = {};

Auth.isLoggedIn = function(req, res, next){
  console.log('isLoggedIn called',req.isAuthenticated());
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()){
    console.log('inside isAuthenticated');
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/login');
}





// expose our config directly to our application using module.exports
module.exports = Auth;
