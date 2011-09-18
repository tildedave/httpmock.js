var r = require('../src/route.js');
var routes = r.routes;
var route = r.route;

describe("Route", function () {

  var getMockResponse = function () {
    var o = {
      handle : function () {}
    };

    spyOn(o, "handle");

    return o;
  };

  var getMockRequest = function () {
    var o = {
      matches : function () {}
    };

    spyOn(o, "matches");
    
    return o;
  };
  
  it("determines if a request matches a route", function () {
    var mockResponse = getMockResponse();
    var mockRequest = getMockRequest();
    var testRequest = {};

    var testRoute = route("Example route", mockRequest, mockResponse);
    testRoute.matches(testRequest);

    expect(mockRequest.matches).toHaveBeenCalledWith(testRequest);
  });
  
  it("handles a request's response", function () {
    var mockResponse = getMockResponse();
    var mockRequest = getMockRequest();    
    var testRequest = {};

    var testRoute = route("Test route", mockRequest, mockResponse);
    testRoute.handle(testRequest);

    expect(mockResponse.handle).toHaveBeenCalledWith(testRequest);
  });
});