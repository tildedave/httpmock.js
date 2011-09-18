var res = require("../src/response.js");
var response = res.response;
var json = res.json;
var text = res.text;

describe("Response", function () {

  var mockResponse = function () {
    var testResponse = {
      setHeader : function () { },
      end : function () { },
      write : function () { }
    };

    spyOn(testResponse, "setHeader");
    spyOn(testResponse, "end");
    spyOn(testResponse, "write");

    return testResponse;
  };
  
  it("handles with text", function () {
    var testResponse = mockResponse();
    text("Hello there!").handle(testResponse);

    expect(testResponse.setHeader)
      .toHaveBeenCalledWith("Content-Type", "text/plain");
  });

  it("handles with a text response", function () {
    var testResponse = mockResponse();
    response(text("Hello there!")).handle(testResponse);

    expect(testResponse.setHeader)
      .toHaveBeenCalledWith("Content-Type", "text/plain");
  });

  it("sets the status code", function () {
    var testResponse = mockResponse();
    response(text("text gives a status code of 200")).handle(testResponse);

    expect(testResponse.statusCode).toEqual(200);
  });

  it("writes text", function () {
    var testResponse = mockResponse();
    response(text("pete campbell")).handle(testResponse);

    expect(testResponse.write).toHaveBeenCalledWith("pete campbell");
  });

  it("writes json", function () {
    var testResponse = mockResponse();
    response(json('{ "success" : true }')).handle(testResponse);
    expect(testResponse.setHeader)
      .toHaveBeenCalledWith("Content-Type", "application/json");
    expect(testResponse.write)
      .toHaveBeenCalledWith('{ "success" : true }');
  });
});
