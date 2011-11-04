var mock = require('../src/mock.js');

var getRoutesFromConfig = mock.getRoutesFromConfig;

describe("Mock", function () {

  var mock_route_module = {
    route : function (name, req, res) {
      return {
        name : name,
        routeRequest : req,
        routeResponse : res
      };
    },
    routes : function (args) {
      return Array.prototype.slice.call(arguments);
    }
  };

  var mock_request_module = {
    request : function (r) {
      return {
        request : r
      };
    },
    uri : function (uri) {
      return {
        uri : uri
      };
    }
  };

  var mock_response_module = {
    response : function (r) {
      return {
        response : r
      };
    },
    text : function (t) {
      return {
        text : t
      };
    }
  };

  var mock_modules = {
    route : mock_route_module,
    request : mock_request_module,
    response : mock_response_module
  };

  it("properly creates a server from config", function () {

    var data = "routes(route('route 1', " +
      "request(uri('/url1')), " +
      "response(text('url1contents'))))";
    var routes = getRoutesFromConfig(data, mock_modules);

    expect(routes[0].name).toBe('route 1');
    expect(routes[0].routeRequest.request.uri).toBe('/url1');
    console.log(routes[0]);
    expect(routes[0].routeResponse.response.text).toBe('url1contents');
  });
});