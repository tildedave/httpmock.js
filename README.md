restmock-node 
=============

Node port of Restmock (https://github.com/tildedave/restmock).

Usage
-----

Specify the server's behavior in a configuration file (config.js) and 
then start the server:

   node src/server.js --config config.js

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
                     otherwise(json({ done : true})))));

Requirements
------------

Restmock-node uses optimist to parse command-line arguments.

    npm install optimist