var argv = require('optimist')
  .usage("Usage: $0 --config [config] --port [port]")
  .demand(['config'])
  .default('port', 5000)
  .argv;

var mock = require('./src/mock.js').mock;

var options = {
  port : argv.port,
  file : argv.config
}

mock(options);

