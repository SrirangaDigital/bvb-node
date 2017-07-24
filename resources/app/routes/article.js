const express = require('express');
const router = express.Router();

// Bring in Article Model
let Article = require('../models/article');

// Get single article
router.get('/:id', function(req, res){

	Article.findOne({_id: req.params.id}, function(err, article){

		if(err){
			
			console.log(err);
		}
		else {

			res.render('article', {

				title: 'Article',
				article: article
			});
		}
	});
});

module.exports = router;