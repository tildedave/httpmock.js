var route = function (desc, request, response) {
  return {
    matches : function (req) {
      return request.matches(req);
    },
    
    handle : function (resp) {
      response.handle(resp);
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
        }
      }
    }
  };
};

module.exports = {
  route : route,
  routes: routes
};