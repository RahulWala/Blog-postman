//calling the module
var express = require('express');

//creating an intance
var app = express();

//calling body and cookie parser 
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//calling mongoose module
var mongoose = require('mongoose');

var newBlog = [];
//using body and cookie parser
app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

//defining configuration of mongodb or at blogApp it will create db
var dbPath = "mongodb://localhost/blogApp";

//telling mongo db to connect at dbPath or connect database
db = mongoose.connect(dbPath);

//checking connection is open or not
mongoose.connection.once('open',function(){
	console.log("Connection is open....");
});

//including schema file or model file
var Blog = require('./blogModel.js');

//To play with the data which will be store in blog or perform various functions on db using blogData variable
var blogData = mongoose.model('Blog');

//basic route to check application is working or not
app.get('/',function(req,res){
	res.send("Application is working......");
});
/////////////////////////////////////////////Main functions//////////////////////////////////////////////////////////////////////

//to see all the blogs
app.get('/blogs',function(req,res){

	//fiind command to show all data in db
	blogData.find(function(err,result){
		if(err){
			console.log(err);
		}
		else{
			console.log(result);
			res.send(result);
		}
	})
});

//to create a blog go to this route
app.post('/blogs/create',function(req,res){

	//make entry for blog title and subtitle
	var newBlog = new blogData({
		blogTitle	: 	req.body.blogTitle,
		blogSubtitle	: 	req.body.blogSubtitle
	});

	//storing authorInfo in blogAuthor from blogModel.js file
	var authorInfo =	{
		fullName			: 	req.body.fullName,
		mobileNo			: 	req.body.mobileNo
	};
	newBlog.blogAuthor = authorInfo;

	//date will be added automatically
	var date = Date.now();
	newBlog.releasedDate = date;

	//saving data
	newBlog.save(function(error){
		if(error){
			console.log(error);
		}
		else{
			res.send(newBlog);
		}
	})
});

//To see particular blog by id
app.get('/blogs/:id',function(req,res){

	blogData.findOne({'_id':req.params.id},function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//for editing in existing blog
app.put('/blogs/:id/edit',function(req,res){

	var update = req.body;

	blogData.findOneAndUpdate({'_id':req.params.id},update,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			
			res.send(result);
		}
	});
});

//deleting the particular blog
app.post('/blogs/:id/delete',function(req,res){
	blogData.remove().where({'_id':req.params.id}).exec(function(err,result){
		if(err){
			res.send(err);
		}
		else{
			console.log("Removed SuccessFully");
			res.send(result);
		}
	})
});

/////////////////////////////////////////////Running app on port 9090 and handling erros/////////////////////////////////////////

//if user enters wrong route
app.get('*',function(req,res,next){
	res.status = 404;
	next("Wrong path you entered");
});

//handling errors
app.use(function(err,req,res,next){
	if(res.status == 404){
		res.send("<h1 style='text-align: center;''>You enterd wrong path which get you to this path. Enter correct path<h1>");
	}
	else{
		res.send(err);
	}
});

app.listen(9090,function(){
	console.log("listeing on port 9090......");
});
