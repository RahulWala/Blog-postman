//calling the module
var mongoose = require('mongoose');

//using the schema part of the module
var blogSchema = mongoose.Schema;

//creating an instance
var blogData = new blogSchema({

	blogTitle			:  		{type:String, default : '', required : true},
	blogSubtitle		:  		{type:String, default : ''},
	releasedDate		:  		{type:Date},
	blogAuthor			:  		{
		fullName	: 		{type : String},
		mobileNo	: 		{type : Number}
	}

});

//blogData is schema name
mongoose.model('Blog',blogData);