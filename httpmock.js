var argv = require('optimist')
  .usage("Usage: $0 --config [config] --port [port]")
  .demand(['config'])
  .default('port', 5000)
  .argv;

var mock = require('./src/mock.js').mock;

mock(argv.port, argv.config);