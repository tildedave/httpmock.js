var request = require('../src/request.js');
var uri = request.uri;

describe("Request", function () {

  it("fails to match a uri", function () {
    expect(uri("/pikachu/[0-9]+").matches("/charmander/5")).toBe(false);
  });

  it("matches a uri", function () {
    expect(uri("/kittens/[0-9]+").matches("/kittens/3")).toBe(true);
  });

});