var mongoose = require('mongoose');
// var User = require('./user');

var commentSchema = new mongoose.Schema({
	text: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});
//this when I export the module    
module.exports = mongoose.model("Comment", commentSchema);