var uri = require('./request.js').uri;
var http = require('http');

var mock = function (req, res) {
  if (uri("/kittens/1").matches(req)) {
    res.writeHead(200, {'Content-Type' : 'text/plain' });
    res.end('Simon the kitten!');
  }
  else {
    res.writeHead(404);
    res.end();
  }
};

http.createServer(mock).listen(5000, "0.0.0.0");