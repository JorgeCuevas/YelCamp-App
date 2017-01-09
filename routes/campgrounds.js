var express = require('express');
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var router = express.Router();
var middleware = require('../middleware');


//list all campgrounds 
router.get("/", function(req, res) {

	Campground.find({}, function(err, campgrounds) {
		if (err) {
			console.log('something went wrong ' + err);
		} else {
			res.render('campgrounds/campground', {
				campground: campgrounds
			});
		}
	});
});


// show campground form to create a new one
router.get("/new", middleware.isLogedIn, function(req, res) {
	res.render("campgrounds/new");
});

//post - make a new campground
router.post("/", function(req, res) {
	//create new Object 
	var name = req.body.name;
	var desc = req.body.description;
	var image = req.body.image;
	var author = {
		id: req.user._id,
		username: req.user.username
	};

	var newcampground = {
		name: name,
		image: image,
		description: desc,
		author: author
	};
	// Persiste it to DB
	Campground.create(newcampground, function(err, newCamp) {
		if (err) {
			console.log('something went wrong saving campground');
		} else {
			res.redirect("/campground");
		}
	});

});

// show information about a particular campground , taking id 
router.get("/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, campground) {
		if (err) {
			console.log('something went wrong');
		} else {
			res.render("campgrounds/show", {
				campground: campground
			});
		}
	});

});

//get edit campground page
router.get("/:id/edit", middleware.checkCampgroundOwerShip, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		res.render("campgrounds/edit", {
			campground: foundCampground
		});
	});

});

// put campground
router.put("/:id", middleware.checkCampgroundOwerShip, function(req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground) {
		if (err) {
			res.redirect("/campground");
		} else {
			res.redirect("/campground/" + req.params.id);
		}
	});
});

//delete campground
router.delete("/:id", middleware.checkCampgroundOwerShip,  function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err, campground) {
		if (err) {
			res.redirect("/campground");
		} else {
			res.redirect("/campground");
		}
	});
});
module.exports = router;