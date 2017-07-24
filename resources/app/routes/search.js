const express = require('express');
const router = express.Router();
const elasticlunr = require('elasticlunr');


// Add Search Route
router.get('/', function(req, res){

	res.render('search', {

		title: 'Search',
	});
});

// Add Search result Route
router.post('/', function(req, res){

	// Bring in SearchIndex Model
	let SearchIndex = require('../models/searchIndex');
	
	let term = req.body.term;
	let regex = new RegExp(term, 'i');

    var results = SearchIndex.search(term, {
        fields: {
            // title: {boost: 1, expand: true}
            text: {boost: 1, expand: false}
        }
    });

	res.render('searchResults', {

		title: 'Search Results',
		results: results
	});
});

module.exports = router;