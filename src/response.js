function writeSuccess(resp, data) {
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
      var toWrite;
      if (typeof(jsonToWrite) === 'object') {
        writeSuccess(resp, JSON.stringify(jsonToWrite));
      }
      else {
        writeSuccess(resp, jsonToWrite);
      }
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
    
    handle : function(req, resp, responseState) {
      ++this.timeCalled;
      
      if (this.timeCalled === timeCalled) {
        responseHandler.handle(req, resp);
        responseState.conditionalResponse = true;
      }
    }
  };
};

var otherwise = function (responseHandler) {
  return {
      handle : function(req, res, responseState) {
        if (!responseState.conditionalResponse) {
          responseHandler.handle(req, res);
        }
      }
  };
};

var response = function (args) {
  var argArray = Array.prototype.slice.call(arguments);
  return {
      handle : function (req, res) {
        var responseState = {
          conditionalResponse : false
        };
        for(var i = 0, l = argArray.length; i < l; ++i) {
          argArray[i].handle(req, res, responseState);
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