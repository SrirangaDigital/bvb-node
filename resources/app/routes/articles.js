const express = require('express');
const router = express.Router();
const elasticlunr = require('elasticlunr');

// Bring in Article Model
let Article = require('../models/article');

// Get list of articles
router.get('/', function(req, res){

	Article.find({}).sort({title: 1}).exec(function(err, articles){

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

module.exports = router;