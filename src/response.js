var writeSuccess = function (resp, data) {
  resp.statusCode = 200;
  resp.write(data);
};

var text = function (textToWrite) {
  return {
    handle: function (req, resp) {
      resp.setHeader("Content-Type", "text/plain");
      writeSuccess(resp, textToWrite);
    }
  };
};

var json = function (jsonToWrite) {
  return {
    handle: function (req, resp) {
      resp.setHeader("Content-Type", "application/json");
      writeSuccess(resp, jsonToWrite);
    }
  };
};

var response = function (args) {
  var argArray = Array.prototype.slice.call(arguments);
  
  return {
      handle : function (req, resp) {
        for(var i = 0, l = argArray.length; i < l; ++i) {
          argArray[i].handle(req, resp);
        }
      }
  };
};

module.exports = {
  text : text,
  json : json,
  response : response
};