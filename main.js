const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow () {

	// Instantiate Express App
	app.server = require(__dirname + '/resources/app/app')();

	// Create the browser window.
	win = new BrowserWindow({
		icon: path.join(__dirname, '/resources/app/public/img/logo.png')
	});
	win.maximize();

	// and load the index.html of the app.
	win.loadURL('http://localhost:3000');


	// Open the DevTools.
	// win.webContents.openDevTools();

	win.focus();

	// Emitted when the window is closed.
	win.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		win = null
	});
}

// Run create window function
app.on('ready', createWindow);

// Quit when allwindows are closed
app.on('window-all-closed', function(){

	if(process.platform !== 'darwin'){

		app.quit();
	}
});