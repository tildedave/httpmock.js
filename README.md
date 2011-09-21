httpmock.js
=============

Node port of Restmock (https://github.com/tildedave/restmock).

HTTPMock is a  server that serves mostly static content.  Its
configuration is specified by an external file in a DSL.

Usage
-----

Specify the server's behavior in a configuration file (config.js) and 
then start the server:

    node httpmock.js --config config.js

### Example config.js

    routes(
      route("Hello, world!",
            request(uri("/hello")),
            response(text("Hello, world!"))),
      route("Can retrieve all the kittens",
            request(uri("/kittens"),
                    method.GET),
            response(text("Some adorable kittens!"))),
      route("Can't make a new kitten",
            request(uri("/kittens"),
                    method.POST),
            response(status(422))),
      route("Can update a kitten",
            request(uri("kittens/([0-9]+)"),
                    method.PUT),
            response(status(422))),
      route("Can check a kitten's async status",
            request(uri("kittenjobs/([0-9]+)"),
                   method.GET),
            response(time(1, json({ done : false })),
                     time(2, json({ done : false })),
                     otherwise(json({ done : true})))))

Customizing the Server
----------------------

Because the server configuration is JavaScript, it is possible to
script dynamic behavior into an otherwise static server.

Matchers
--------

Functions inside a `request` determine if an incoming HTTP request
matches the given route.  

Some built-in matchers are `uri` and `method`.  

Custom matcher objects should have a function `matches` that returns
`true` or `false`.  

Here is an example of a custom matcher that will match a request's 
accept header.

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
      route("other kinds of data",
        request(uri("/data")),
        response(text("succeeded!"))));

Requirements
------------

httpmock.js depends on optimist for parsing command-line arguments.

    npm install optimist