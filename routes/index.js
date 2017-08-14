const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://lam:lam@ds161262.mlab.com:61262/gamingblog', ['blogs']);


// Get Homepage
router.get('/', function(req, res){
	res.render('index', {layout: false});
});

// Get Blog
router.get('/blog', function(req, res){
	db.blogs.find(function(err, allBlogs){
		if(err){
			res.send(err);
		}
		res.render('blog', {blogs: allBlogs, layout: false});
	});
});



// Get About
router.get('/about', function(req, res){
	res.render('about', {layout: false});
});

// Get Contact
router.get('/contact', function(req, res){
	res.render('contact', {layout: false});
});

// Get Submit Blog
router.get('/submitblog', function(req, res){
	res.render('submitblog', {layout: false});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;