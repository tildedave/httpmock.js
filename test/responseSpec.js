var res = require("../src/response.js");
var response = res.response;
var json = res.json;
var status = res.status;
var text = res.text;
var time = res.time;
var otherwise = res.otherwise;

describe("Response", function () {

  var mockRequest = function () {
      return {};
  };
  
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
    text("Hello there!").handle(mockRequest(), testResponse);

    expect(testResponse.setHeader)
      .toHaveBeenCalledWith("Content-Type", "text/plain");
  });

  it("handles with a text response", function () {
    var testResponse = mockResponse();
    response(text("Hello there!")).handle(mockRequest(), testResponse);

    expect(testResponse.setHeader)
      .toHaveBeenCalledWith("Content-Type", "text/plain");
  });

  it("sets the status code", function () {
    var testResponse = mockResponse();
    response(text("text gives a status code of 200"))
      .handle(mockRequest(), testResponse);

    expect(testResponse.statusCode).toEqual(200);
  });


  it("handles with a status code", function () {
    var testResponse = mockResponse();
    response(status(422)).handle(mockRequest(), testResponse);
    
    expect(testResponse.statusCode).toEqual(422);
  });
  
  it("writes text", function () {
    var testResponse = mockResponse();
    response(text("pete campbell")).handle(mockRequest(), testResponse);

    expect(testResponse.write).toHaveBeenCalledWith("pete campbell");
  });

  it("writes an object as json", function () {
    var testResponse = mockResponse();
    var jsonObject = { success : true };
    response(json(jsonObject)).handle(mockRequest(), testResponse);
    expect(testResponse.setHeader)
      .toHaveBeenCalledWith("Content-Type", "application/json");
    expect(testResponse.write)
      .toHaveBeenCalledWith(JSON.stringify(jsonObject));
  });

  it("writes a string as json", function () {
    var testResponse = mockResponse();
    response(json('{"success" : true}')).handle(mockRequest(), testResponse);
    expect(testResponse.setHeader)
      .toHaveBeenCalledWith("Content-Type", "application/json");
    expect(testResponse.write)
      .toHaveBeenCalledWith('{"success" : true}');
  });
  
  it("calls end", function () {
    var testResponse = mockResponse();
    response(text('should call end')).handle(mockRequest(), testResponse);
    expect(testResponse.end)
      .toHaveBeenCalled();
  });

  it("writes different results the first and second time", function () {
    var testResponse1 = mockResponse();
    var testResponse2 = mockResponse();
    var r = response(time(1, text('Kittens')),
                     time(2, text('Puppies')));

    r.handle(mockRequest(), testResponse1);
    r.handle(mockRequest(), testResponse2);

    expect(testResponse1.write).toHaveBeenCalledWith('Kittens');
    expect(testResponse1.write).wasNotCalledWith('Puppies');
    
    expect(testResponse2.write).wasNotCalledWith('Kittens');
    expect(testResponse2.write).toHaveBeenCalledWith('Puppies');
  });

  it("does not write a default if time matches", function () {
    var testResponse = mockResponse();
    var r = response(time(1, text('Charmander')),
                     otherwise(text('Abra')));

    r.handle(mockRequest(), testResponse);
    
    expect(testResponse.write).wasNotCalledWith('Abra');
  });
  
  it("writes a default if a time does not match", function () {
    var testResponse = mockResponse();
    
    var r = response(time(1, text('Pikachu')),
                     otherwise(text('Bulbasaur')));

    r.handle(mockRequest(), mockResponse());
    r.handle(mockRequest(), testResponse);

    expect(testResponse.write).toHaveBeenCalledWith('Bulbasaur');
    expect(testResponse.write).wasNotCalledWith('Pikachu');
  });
});
