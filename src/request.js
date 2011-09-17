var uri = function (regexp) {
  var re = new RegExp(regexp);
  
  var obj = {
    matches: function (req) {
      return req.url.match(re) !== null;
    }
  };

  return obj;
};

var request = function (args) {

  var argArray = Array.prototype.slice.call(arguments);
  return {
    matches : function (req) {
      for(var i = 0; i < argArray.length; ++i) {
        var arg = argArray[i];
        if (!arg.matches(req)) {
          return false;
        }
      }

      return true;
    }
  };
};


module.exports = {
  uri : uri,
  request : request
};