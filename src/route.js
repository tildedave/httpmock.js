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

var routes = function () {
    
};

module.exports = {
  route : route,
  routes: routes
};