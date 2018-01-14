// Required Modules
var express = require('express');
var app = express();
var mongoose = require('mongoose');
// Required Middlewares
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));
app.use(bodyParser.json({limit:'10mb',extended:true}));

// Application Level Middleware
app.use(function(req,res,next){
  console.log("Time Log ", new Date());
  console.log("URL Log ", req.originalUrl);
  console.log("IP Log ", req.ip);
  next();
});


// Routes
var routes = require('./routes')
// Home Route
app.get('/', routes.home);

// route to get all blogs
app.get('/allblogs', routes.allblogs);

// route to create a particular blog
app.post('/blog/create', routes.createblog );

// route to get a particular blog
app.get('/blog/:blogID', routes.getSingleBlog);


// route to edit a blog
app.put('/blog/:blogID/edit', routes.editBlog);

// route to delete a blog
app.post('/blog/:blogID/delete', routes.deleteblog);

// not found

app.get('*', routes.notFound);

// Listen
app.listen(3000,function(){
  console.log('App is listening on PORT 3000');
});
