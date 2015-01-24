var fs = require('fs');

var ler = function(arquivo) {
	var path = './' + arquivo;
	fs.stat(path, function(error, stat) {
		if(error) {throw error;}
		if(stat.isFile()) {
			console.log('%s %d bytes', arquivo, stat.size);
		}
	});
};

var lerDiretorio = function() {
	fs.readdir(__dirname, function(error, contents) {
		if(error) { throw error;}
		contents.forEach(function(content) {
			ler(content);
		});
	});
};

lerDiretorio();