var http = require('http');

var req = require('../src/request.js');
var uri = req.uri;
var request = req.request;

describe("Request", function () {

  it("fails to match a uri", function () {
    var testRequest = {
        url:  "/charmander/5"
    };

    expect(request(uri("/pikachu/[0-9]+"))
           .matches(testRequest))
      .toBe(false);
  });

  it("matches a uri", function () {
    var testRequest = {
        url:  "/kittens/3"
    };

    expect(request(uri("/kittens/[0-9]+"))
           .matches(testRequest))
      .toBe(true);
  });

  it("matches from criteria", function () {
    var testRequest = {
      url : "/pikachu/50"
    };

    expect(request(uri("/pikachu/.*"))
           .matches(testRequest))
      .toBe(true);
  });

  it("matches two criteria", function () {
    var testRequest = {
      url : "/bulbasaur/4"
    };

    expect(request(uri("/bulbasaur/4"),
                   uri("/bulbasaur/[0-9]+"))
           .matches(testRequest))
      .toBe(true);
  });

  it("fails on the second criteria", function () {
    var testRequest = {
      url : "/squirtle/50"
    };

    expect(request(uri("/bulbasaur/[0-9]+"),
                   uri("/bulbasaur/40"))
           .matches(testRequest))
      .toBe(false);
  });
});