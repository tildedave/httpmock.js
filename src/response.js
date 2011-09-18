var text = function (textToWrite) {
  return {
    handle: function (resp) {
      resp.setHeader("Content-Type", "text/plain");
      resp.statusCode = 200;
      resp.write(textToWrite);
    }
  };
};

var json = function (jsonToWrite) {
  return {
    handle: function (resp) {
      resp.setHeader("Content-Type", "application/json");
      resp.statusCode = 200;
      resp.write(jsonToWrite);
    }
  };
};

var response = function (args) {
  var argArray = Array.prototype.slice.call(arguments);
  
  return {
      handle : function (resp) {
        for(var i = 0, l = argArray.length; i < l; ++i) {
          argArray[i].handle(resp);
        }
      }
  };
};

module.exports = {
  text : text,
  json : json,
  response : response
};