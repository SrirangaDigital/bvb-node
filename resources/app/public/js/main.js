window.jQuery = window.$ = require('jquery');
const electron = require('electron')
const PDFWindow = require('electron-pdf-window')
const { BrowserWindow } = electron.remote

$(document).ready(function() {

	$('.pdf').on('click', function(event){

		event.preventDefault();
		var pdfURL = $(this).attr('href');

		const win = new BrowserWindow({
	
			width: 800,
			height: 600
		})
		PDFWindow.addSupport(win)

		win.loadURL('http://localhost:3000/' + pdfURL);
	});

});