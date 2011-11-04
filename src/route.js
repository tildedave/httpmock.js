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
  return {
    process: function (req, res) {
      for(var i = 0, l = argArray.length; i < l; ++i) {
        if (argArray[i].matches(req)) {
          argArray[i].handle(req, res);
          return;
        }
      }

      res.writeHead(404);
      res.end();
    }
  };
};

module.exports = {
  route : route,
  routes: routes
};