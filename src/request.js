var uri = function (regexp) {
  var re = new RegExp(regexp);
  
  var obj = {
    matches: function (req) {
      return req.url.match(re) !== null;
    }
  };

  return obj;
};

var request = {
  uri : uri
};

module.exports = request;