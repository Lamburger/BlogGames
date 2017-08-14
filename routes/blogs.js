var express = require('express');
var router = express();
const mongojs = require('mongojs');
const db = mongojs('mongodb://lam:lam@ds161262.mlab.com:61262/gamingblog', ['blogs']);

const Blogs = require('../models/blogs');


// Get All Blogs
router.get('/', function(req, res, next){
    db.blogs.find(function(err, blogs){
        if(err){
            res.send(err);
        }
        res.json(blogs);
    });
});


// Get Single Blog
router.get('/:id', function(req, res, next){
    db.blogs.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, blog){
        if(err){
            res.send(err);
        }
        res.json(blog);
    });
});




//Save Blog

router.post('/', function(req, res, next){
    var blog = req.body;
    if(!blog.title || !blog.review || !blog.url ){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.blogs.save(blog, function(err, blog){
            if(err){
                res.send(err);
            }
            res.json(blog);
        });
    }
});




// Delete Blog
router.delete('/:id', function(req, res, next){
    db.blogs.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, blog){
        if(err){
            res.send(err);
        }
        res.json(blog);
    });
});



// Update Blog
router.put('/:id', function(req, res, next){
    var review = req.params.data.review;
    var url = req.params.data.url;
    var title = req.params.data.title;
    var updBlog = {};
    
    if(title){
        updBlog.title = title;
    }
    
    if(review){
        updBlog.review = review;
    }

    if(url){
        updBlog.url = url;
    }
    
    if(!updBlog){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.blogs.update({_id: mongojs.ObjectId(req.params.id)}, updBlog, {}, function(err, blog){
        if(err){
            res.send(err);
        }
        res.json(blog);
    });
    }
});






// // Update Blog
// router.put('/blog/:id', function (req, res, next) {
//     return updateBlog(req.body);
// });

// router.put('/blog', function (req, res, next) {
//     var blogs = req.body;

//     for (var i = 0; i < blogs.count; i++) {
//         updateBlog(blogs[i]);
//     }
// });

// function updateBlog(blog) {
//     var updBlog = {};
//     if (blog.isDone) {
//         updBlog.isDone = blog.isDone;
//     }

//     if (blog.title) {
//         updBlog.title = blog.title;
//     }
//     db.blogs.update({
//         _id: mongojs.ObjectId(req.params.id)
//     }, updBlog, {}, function (err, blog) {});
//     return updBlog;
// }


module.exports = router;