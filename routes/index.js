var express = require('express');
var router = express.Router();


// =====================================
// HOME PAGE ===========================
// =====================================
router.get('/', isLoggedIn, function( req, res, next ) {
  res.render('index');
});

// =====================================
// LOGIN GET ===========================
// =====================================
router.get('/login', function( req, res ) {
  res.render('login');
});

// =====================================
// LOGIN POST ==========================
// =====================================
router.post('/login', function( req, res ) {
  res.render('login');

  res.redirect('login#signin');
});

// =====================================
// SIGNUP GET ==========================
// =====================================
router.get('/signup', function( req, res ) {
  // res.render('login');
  res.redirect('/login#signup');
});

// router.get('/register', function( req, res ) {
//   res.redirect('/login#signup');
// });


// =====================================
// SIGNUP POST =========================
// =====================================
router.post('/signup', function( req, res ) {
  res.render('login');
});

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function( req, res) {
        req.logout();
        res.redirect('/login');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

module.exports = router;
