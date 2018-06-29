var express = require('express');
var app = express();
var http = require('http');

var server = http.Server(app);
server.listen(process.env.PORT || 8080, function() {
	console.log('Server started at http://localhost:8080');
});

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(request, response) {
    response.sendfile(__dirname + '/index.html');
});