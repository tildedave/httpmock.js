var accepts = function(acceptsType) {
  return {
    matches : function (req) {
      var accept = req.headers.accept;
      
      if (!accept) {
        return false;
      }

      return accept.indexOf(acceptsType) != -1;
    }
  };
}

routes(
  route("JSON data", 
    request(uri("/data"),
            accepts("application/json")),
    response(json({ success: true }))),
  route("XML data",
    request(uri("/data")),
    response(text("succeeded!"))));
