const express = require('express');
const router = express.Router();
const elasticlunr = require('elasticlunr');
const fs = require('fs');
const path = require('path');

// Create index and store it to a file
router.get('/', function(req, res){

	var pad = "000";
    
    for(i=1;i<=61;i++) {

    	var searchIndex = elasticlunr(function () {

    	    this.addField('title');
    	    this.addField('authorname');
    	    this.addField('text');
    	    this.setRef('titleid');
    	    this.saveDocument(false);
    	});

		var str = "" + i;
		var id = pad.substring(0, pad.length - str.length) + str;

		var volumeData = JSON.parse(fs.readFileSync(path.join(__dirname, '../source/' + id + '.json'), 'utf8'))
		for(j=0;j<volumeData.length;j++) {

			console.log(volumeData[j]['titleid']);
	        searchIndex.addDoc(volumeData[j]);
	    }
	
		fs.writeFileSync(path.join(__dirname, '../public/index/searchIndex' + id + '.json'), JSON.stringify(searchIndex), function (err) {
			if (err) throw err;
			console.log('done');
		});
	}

});

module.exports = router;