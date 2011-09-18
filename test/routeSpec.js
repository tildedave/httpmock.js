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

  var getTestResponse = function () {
    var testResponse = {
      writeHead : function () {},
      end : function () {}
    };

    spyOn(testResponse, "writeHead");
    spyOn(testResponse, "end");

    return testResponse;
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
    var testResponse = getTestResponse();

    var testRoute = route("Test route", mockRequest, mockResponse);
    testRoute.handle(testRequest, testResponse);

    expect(mockResponse.handle).toHaveBeenCalledWith(testRequest, testResponse);
  });

  it("handles one route", function  () {
    var successfulRequest = getSuccessfulMockRequest();
    var mockResponse = getMockResponse();

    var testRoutes = routes(route("Route that works",
                                  successfulRequest,
                                  mockResponse));

    var testRequest = {};
    var testResponse = getTestResponse();
    testRoutes.process(testRequest, testResponse);

    expect(mockResponse.handle).toHaveBeenCalledWith(testRequest, testResponse);
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
    var testResponse = getTestResponse();
    testRoutes.process(testRequest, testResponse);

    expect(mockResponse.handle).toHaveBeenCalledWith(testRequest, testResponse);
  });

  it("gives a 404 with no matcher", function () {
    var failedRequest = getFailedMockRequest();

    var testRoutes = routes(route("Won't match ever",
                                  failedRequest,
                                  getMockResponse()));

    
    var testRequest = {};
    var testResponse = getTestResponse();
    
    testRoutes.process(testRequest, testResponse);

    expect(testResponse.writeHead).toHaveBeenCalledWith(404);
    expect(testResponse.end).toHaveBeenCalled();
  });
});