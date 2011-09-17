var http = require('http');

var request = require('../src/request.js');
var uri = request.uri;

describe("Request", function () {

  it("fails to match a uri", function () {
    var request = {
        url:  "/charmander/5"
    };

    expect(uri("/pikachu/[0-9]+").matches(request)).toBe(false);
  });

  it("matches a uri", function () {
    var request = {
        url:  "/kittens/3"
    };

    expect(uri("/kittens/[0-9]+").matches(request)).toBe(true);
  });
});