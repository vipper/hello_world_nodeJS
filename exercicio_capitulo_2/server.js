var http = require('http');
var fs = require('fs');
var htmlSelector = require('./HtmlSelector');

var server = http.createServer(function(request, response) {

	var selector = new htmlSelector(request.url);

	fs.readFile(selector.getHTMLFilePath(), function(error, html) {
		response.writeHeader(200, {'Content-Type': 'text/html'});
		response.end(html);
	});

});

server.listen(3000, function() {
	console.log('Executando...');
});