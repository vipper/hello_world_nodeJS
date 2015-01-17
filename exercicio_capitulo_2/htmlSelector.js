var fs = require('fs');

function HtmlSelector(url) {
	this.url = url;
}

HtmlSelector.prototype.getHTMLFilePath = function() {
	var html = "";
	if(this.url == "/" || this.url == "") {
		html = "artigos";
	} else {
		html = this.url.split("/")[1];
	}

	if(fs.existsSync(__dirname+"/"+html+".html")) {
		return __dirname+"/"+html+".html";
	} else {
		return __dirname+"/error.html";
	}

}

module.exports = HtmlSelector;