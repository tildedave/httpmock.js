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
    
    return o;
  };

  var getSuccessfulMockRequest = function () {
    var mockRequest = getMockRequest();
    spyOn(mockRequest, "matches").andReturn(true);

    return mockRequest;
  };

  var getFailedMockRequest = function () {
    var mockRequest = getMockRequest();
    spyOn(mockRequest, "matches").andReturn(false);

    return mockRequest;
  };
  
  it("determines if a request matches a route", function () {
    var mockResponse = getMockResponse();
    var mockRequest = getMockRequest();
    spyOn(mockRequest, "matches");
    
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

  it("handles one route", function  () {
    var successfulRequest = getSuccessfulMockRequest();
    var mockResponse = getMockResponse();

    var testRoutes = routes(route("Route that works",
                                  successfulRequest,
                                  mockResponse));

    var testRequest = {};
    var testResponse = {};
    testRoutes.process(testRequest, testResponse);

    expect(mockResponse.handle).toHaveBeenCalledWith(testResponse);
  });
  
  it("matches the correct route", function () {
    var failedRequest = getFailedMockRequest();
    var successfulRequest = getSuccessfulMockRequest();
    var mockResponse = getMockResponse();

    var testRoutes = routes(route("Failed route",
                                  failedRequest,
                                  getMockResponse()),
                            route("Successful route",
                                  successfulRequest,
                                  mockResponse));

    var testRequest = {};
    var testResponse = {};
    testRoutes.process(testRequest, testResponse);

    expect(mockResponse.handle).toHaveBeenCalledWith(testResponse);
  });
});