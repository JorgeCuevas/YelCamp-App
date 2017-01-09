var express = require('express');
var User = require('../models/user');
var router = express.Router();
var passport = require('passport');


// root route
router.get("/", function(req, res) {
	res.render("landing");
});

//register user page
router.get("/register", function(req, res) {
	res.render("register");
});

// register post 
router.post("/register", function(req, res) {
	let newUser = new User({
		username: req.body.username
	});
	User.register(newUser, req.body.password, function(err, newuser) {
		if (err) {
			req.flash("error", err.message);
			return res.redirect("/register");
		}

		passport.authenticate('local')(req, res, function() {
			req.flash("success", "Welcome to YelpCamp "+ newuser.username);
			res.redirect("/campground");
		});
	});
});


// login page router
router.get("/login", function(req, res) {
	res.render("login");
});

// login post authenticate
router.post("/login", passport.authenticate("local", {
	successRedirect: "/campground",
	failureRedirect: "/login"
}), function(req, res) {
	console.log('log' + req);
});

router.get("/logout", function(req, res) {
	req.logout();
	req.flash("success", "Logged you out");
	res.redirect("/campground");
});




module.exports = router;