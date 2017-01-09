var express = require('express');
var router = express.Router({
	mergeParams: true
});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');




// find the comments which belong to a campground
router.post("/", middleware.isLogedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log('something went wrong new comments');
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					req.flash('error', 'something went wrong saving comment');
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save(function(err) {
						if (err) {

							res.redirect('/campground');
						}
						req.flash('success', 'Succefully added comment');
						res.redirect('/campground/' + campground._id);
					});
				}
			});
		}
	});

});

// get the page to add new comments
router.get("/new", middleware.isLogedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log('something went wrong new comments');
		} else {
			res.render("comments/new", {
				campground: campground
			});
		}
	});

});
//  show edit page for comment
router.get("/:comment_id/edit", middleware.checkCommentOwerShip, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if (err) {
			res.redirect("/campground");
		} else {
			res.render("comments/edit", {campground_id : req.params.id,
				comment : foundComment});	
		}
	});
});
// edit request to comment
router.put("/:comment_id", middleware.checkCommentOwerShip, function(req, res){
		Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
			if (err) {
					res.redirect("/campground");
			} else {
				res.redirect("/campground/"+req.params.id);
			}
		});
});

router.delete("/:comment_id", function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		 if (err) {
		 	res.redirect("back");
		 } else {
		 	req.flash("success", "Succefully deleted");
		 	res.redirect("/campground/"+ req.params.id);
		 }
	});
});

module.exports = router;