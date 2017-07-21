const express = require('express');
const router = express.Router();

// Bring in Article Model
let Article = require('../models/article');

// Get list of articles
router.get('/', function(req, res){

	Article.find({}, function(err, articles){

		if(err){
			
			console.log(err);
		}
		else {

			res.render('articles', {

				title: 'List of articles',
				articles: articles
			});
		}
	});

});

// Add Search Route
router.get('/search', function(req, res){

	res.render('search', {

		title: 'Search',
	});
});


// Add Search result Route
router.post('/search', function(req, res){

	let term = req.body.term;
	let regex = new RegExp(term, 'i');

	Article.find({title: {'$regex': regex}}, function(err, articles){

		if(err){
			
			console.log(err);
		}
		else {

			res.render('articles', {

				title: 'Search Results',
				articles: articles
			});
		}
	});
});

module.exports = router;