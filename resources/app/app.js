// module.exports = () => {
	const express = require('express');
	const path = require('path');
	const bodyParser = require('body-parser');

	// Init app
	const app = express();

	// Bring in Models
	let Article = require('./models/article');

	// Load View engine
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');

	// Body parser Middleware
	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }));
	// parse application/json
	app.use(bodyParser.json());


	// Set Public folder
	app.use(express.static(path.join(__dirname, 'public')));

	// Route Files
	// let articles = require('./routes/articles');
	// app.use('/articles', articles);

	// let article = require('./routes/article');
	// app.use('/article', article);

	// let createIndex = require('./routes/createIndex');
	// app.use('/createIndex', createIndex);

	// let search = require('./routes/search');
	// app.use('/search', search);

	let api = require('./routes/api');
	app.use('/api', api);

	// Home Route
	app.get('*', function(req, res) {
		
		// load the single view file (angular will handle the page changes on the front-end)
		res.sendFile(path.join(__dirname, 'public/index.html'));
	});

	// Start Server
	app.listen(3000, function(){

		console.log('Server started on port 3000');
	});
// }