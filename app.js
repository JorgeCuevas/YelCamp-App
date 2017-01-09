  var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	locaStrategy = require('passport-local'),
	methodOverride = require('method-override'),
	flash 		=	require('connect-flash'),
	User = require('./models/user'),
	Campground = require('./models/campground'),
	Comment = require('./models/comment'),
	seedBD = require('./seeds');

var indexRouter = require('./routes/index'),
	campgroundsRouter = require("./routes/campgrounds"),
	commentsRouter = require("./routes/comments");

// seedBD(); seed data base
//Setting up app
mongoose.connect("mongodb://george:soygeorge@ds159208.mlab.com:59208/yelp-camp");
// mongoose.connect("mongodb://localhost/yemp_camp4");
app.set("view engine", "ejs");
app.use(require('express-session')({
	secret : 'there is not way that studing',
	resave : false,
	saveUninitialized: false	
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname +"/public"));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(methodOverride("_method"));
app.use(flash());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use("/", indexRouter);
app.use("/campground/:id/comments", commentsRouter);
app.use("/campground" ,campgroundsRouter);

//Setting up passport
passport.use(new locaStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.listen(process.env.PORT || 3000, function() {
	console.log('The YelCamp server has started');
});