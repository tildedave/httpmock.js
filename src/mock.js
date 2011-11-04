var fs = require('fs');
var http = require('http');

var getRoutesFromConfig = function (data, modules) {

  var request_module = modules.request;
  var response_module = modules.response;
  var route_module = modules.route;

  var __routes;
  (function () {
    
    // DSL Namespacing
    
    var uri = request_module.uri;
    var request = request_module.request;
    var method = request_module.method;
    
    var response = response_module.response;
    var text = response_module.text;
    var json = response_module.json;
    var status = response_module.status;
    var time = response_module.time;
    var otherwise = response_module.otherwise;      

    var route = route_module.route;
    var routes = route_module.routes;

    __routes = eval(data);
  }());

  return __routes;
};

var startServerFromConfig = function (options) {
  var port = options.port;
  return function (err, data) {
    console.log("Starting server with configuration:");
    console.log("------------------------------------------------");
    console.log(data);
    console.log("------------------------------------------------");

    var routes = getRoutesFromConfig(data, {
      request : require('./request.js'),
      response : require('./response.js'),
      route : require('./route.js')
    });
    
    console.log("Starting server on port " + port);
    
    var verifyHeader = options.verify.toLowerCase();
    http.createServer(function (req, res) {
      if (req.headers[verifyHeader] !== undefined) {
        console.log(new Date() + " -- " + req.method + " " + req.url +
                    " (verify)");
        routes.processVerify(req, res);
      }
      else {
        console.log(new Date() + " -- " + req.method + " " + req.url);
        routes.process(req, res);
      }
      
    }).listen(port, "0.0.0.0");
  };
};

var mock = function (options) {
  var file = options.file;
  fs.readFile(file, encoding="ascii", startServerFromConfig(options));
};

module.exports = {
  mock : mock,
  getRoutesFromConfig : getRoutesFromConfig,
  startServerFromConfig : startServerFromConfig
};