var mongoose = require('mongoose');
// connect to database
var dbPath = "mongodb://localhost/blogDatabase";

db = mongoose.connect(dbPath);

mongoose.connection.once('open',function(){
  console.log("Database Connection Successful");
});

var Blog = require('../blogModel.js');
var blogModel = mongoose.model('BlogModel');


// defining routes

// home
exports.home = function(req,res){
  res.send("<h1>Welcome To Edwisor's Blog.</h1>")
};

// get all blogs
exports.allblogs = function(req,res){
  blogModel.find(function(err,result){
    if(err){
      res.send(err);
    }
    else{
      res.send(result);
    }
  });
};

// create route
exports.createblog = function(req,res){
  var newBlog = new blogModel({
    title    : req.body.title,
    subTitle : req.body.subTitle,
    blogBody : req.body.blogBody
  });

// getting date
var today = Date.now();
  newBlog.created = today;
// getting tags
var allTags = (req.body.allTags != undefined && req.body.allTags != null) ? req.body.allTags.split(',') : '';
  newBlog.tags = allTags;
// getting author information
var authorInfo = {
    fullName : req.body.authorFullName,
    email    : req.body.authorEmail
  };

  newBlog.authorInfo = authorInfo;

  newBlog.save(function(error){
    if(error){
      console.log(error);
      res.send(error);
    }
    else{
      res.send(newBlog);
    }
  });
};

//get particular blog
exports.getSingleBlog = function(req,res){
  blogModel.findOne({'_id':req.params.blogID},function(err,result){
    if(err){
     console.log(err);
    }
    else{
      res.send(result);
    }
  });
};

// edit a blog
exports.editBlog = function(req,res){
  var edit = req.body;
  blogModel.findOneAndUpdate({'_id':req.params.blogID},edit,function(err,result){
    if(err){
      res.send(err);
    }
    else{
      res.send(result);
    }
  });
};

// delete a blog
exports.deleteblog = function(req,res){
  blogModel.remove({'_id':req.params.blogID},function(err,result){
    if(err){
      res.send(err);
      }
      else{
        res.send(result);
      }
  });
};

// not found page
exports.notFound = function(req,res){
  res.send("Page Not Found.");
};
