var mongoose = require('mongoose'),
passportLocalStrategy = require('passport-local-mongoose');


userSchema = new mongoose.Schema({
	username :String,
	password : String
});

userSchema.plugin(passportLocalStrategy);

module.exports = mongoose.model("User", userSchema);