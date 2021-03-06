var express = require('express');
var router = express.Router();
var passport = require('passport');
var Auth = require('../config/auth');
// require('../config/passport')(passport);

/* GET users listing. */
router.get('/', Auth.isLoggedIn, function(req, res, next) {
  res.render('index');
});



router.get('/login', function(req, res){
  res.render('login');
});

router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
}));

router.get('/signup', function(req, res){
  res.redirect('login#signup');
});

router.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
}));

router.get('/logout', function(req, res){

    req.logout();
    res.redirect('/login');
});


module.exports = router;
