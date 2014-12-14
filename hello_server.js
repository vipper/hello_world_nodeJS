var http = require('http');

var atenderRequisicao = function(request, response) {
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<h1> Hello World!</h1>");
	response.end();
}

var server = http.createServer(atenderRequisicao);

var servidorLigou = function() {
	console.log("Servidor Hello World rodando!");
}

server.listen(3000, servidorLigou);