var route = function (desc, request, response) {
  var handledRequests = [];
  
  return {
    matches : function (req) {
      return request.matches(req);
    },
    
    handle : function (req, resp) {
      handledRequests.push(req);
      response.handle(req, resp);
    },

    handleVerify : function (req, resp) {
      resp.writeHead(200);
      resp.end(handledRequests);
    }
  };
};

var routes = function (args) {
  var argArray = Array.prototype.slice.call(arguments);
  var doOnMatch = function (func) {
    return function (req, res) {
      for(var i = 0, l = argArray.length; i < l; ++i) {
        var route = argArray[i];
        if (route.matches(req)) {
          route[func](req, res);
          return;
        }
      }
      
      res.writeHead(404);
      res.end();
    };
  };
  return {
    process: doOnMatch("handle"),
    processVerify : doOnMatch("handleVerify")
  };
};

module.exports = {
  route : route,
  routes: routes
};