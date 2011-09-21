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

var status = function (statusCode) {
  return {
    handle : function (req, res) {
      res.statusCode = statusCode;
    }
  };
};

var time = function (timeCalled, responseHandler) {
  return {
    timeCalled : 0,
    
    handle : function(req, resp) {
      ++this.timeCalled;
      
      if (this.timeCalled === timeCalled) {
        responseHandler.handle(req, resp);
        return true;
      }

      return false;
    }
  };
};

var otherwise = function (responseHandler) {
  return {
      handle : function(req, res, condResponse) {
        if (!condResponse) {
          responseHandler.handle(req, res);
        }
      }
  };
};

var response = function (args) {
  var argArray = Array.prototype.slice.call(arguments);
  return {
      handle : function (req, res) {
        var hadCondResponse = false;
        for(var i = 0, l = argArray.length; i < l; ++i) {
          var condResponse = argArray[i].handle(req, res, hadCondResponse);
          if(condResponse === true) {
            hadCondResponse = true;
          }
        }

        res.end();
      }
  };
};

module.exports = {
  text : text,
  json : json,
  response : response,
  status : status,
  time : time,
  otherwise : otherwise
};