var express = require('express');
var router = express.Router();
var passport = require('passport');
// require('../config/passport')(passport);
function isLoggedIn(req, res, next) {
console.log('isLoggedIn called',req.isAuthenticated());
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
      console.log('inside isAuthenticated');
      return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
/* GET users listing. */
router.get('/', isLoggedIn, function(req, res, next) {
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




module.exports = router;
