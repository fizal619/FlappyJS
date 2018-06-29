var express = require('express');
var app = express();
var http = require('http');

// set up the server to run on port 8080
var server = http.Server(app);
server.listen(process.env.PORT || 8080, function() {
	console.log('Server started at http://localhost:8080');
});

// make the assets folder available
app.use('/assets', express.static(__dirname + '/assets'));

// serve index.html in response to a get request at the root
app.get('/', function(request, response) {
    response.sendfile(__dirname + '/index.html');
});