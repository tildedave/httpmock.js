var fs = require('fs');
var http = require('http');

/**
 * DSL Namespacing
 */

var uri = require('./request.js').uri;
var request = require('./request.js').uri;
var method = require('./request.js').method;

var response = require('./response.js').response;
var text = require('./response.js').text;

var route = require('./route.js').route;
var routes = require('./route.js').routes;

var mock = function (port, file) {
  fs.readFile(file, encoding="ascii", function (err, data) {
    console.log("Starting server with configuration:");
    console.log("------------------------------------------------");
    console.log(data);
    console.log("------------------------------------------------");
    
    var r = eval(data);
    console.log("Starting server on port " + port);
    
    http.createServer(function (req, res) {
      console.log(new Date() + " -- " + req.method + " " + req.url);
      r.process(req, res);
    }).listen(port, "0.0.0.0");
  });
};

module.exports = {
  mock : mock
};