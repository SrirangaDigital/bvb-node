const express = require('express');
const _und = require("underscore")
const router = express.Router();

// Bring in Article Model
let Article = require('../models/article');

// Get distinct params
router.get('/distinct/:param', function(req, res){

	var param = req.params.param;
	
	var query = {};
	
	getDistinctParams(res, query, param);	
});

router.get('/parts/:volume', function(req, res){

	var param = 'part';

	var query = {}; query['volume'] = req.params.volume;

	getDistinctParams(res, query, param);
});

router.get('/articles/:volume/:part', function(req, res){

	var query = {};
	query['volume'] = req.params.volume;
	query['part'] = req.params.part;

	var sort = {}; sort['page'] = 1;

	Article.find(query).sort(sort).exec(function(err, result){

		if(err)			
			console.log(err);
		else 
			res.json(result);
	});
});

router.get('/search', function(req, res){

	var query = {};
	_und.each(req.query, function(value, key) {

		query[key] = new RegExp(value, 'i');
	});

	var sort = {}; sort['volume'] = 1; sort['part'] = 1; sort['page'] = 1;

	Article.find(query).sort(sort).exec(function(err, result){

		if(err)			
			console.log(err);
		else 
			res.json(result);
	});
});

router.get('/search/text/:term/:volume', function(req, res){

	// Bring in SearchIndex Model
	// Only one index is loaded at a time

	var volIndex = ('000' + req.params.volume).substr(-3);
	volIndex = ((parseInt(volIndex) > 0) && (parseInt(volIndex) <= 60)) ? volIndex : '001';

	let SearchIndex = require('../models/searchIndex')(volIndex);
	
	let term = req.params.term;

    var result = SearchIndex.search(term, {
        fields: {
            // title: {boost: 1, expand: true}
            text: {boost: 1, expand: false}
        }
    });

	res.json(result);
});

function getDistinctParams(res, query, param){

	var projection = {}; projection[param] = 1; projection['_id'] = 0;
	var sort = {}; sort[param] = 1;

	Article.find(query, projection).sort(sort).exec(function(err, result){

		if(err)			
			console.log(err);

		else {

			iteratee = function(row){return row[param];};
			var data = _und.map(_und.unique(result, iteratee));

			res.json(data);
		}
	});
}

module.exports = router;