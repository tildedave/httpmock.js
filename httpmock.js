var argv = require('optimist')
  .usage("Usage: $0 --config [config] --port [port]")
  .default('config', 'mock.js')
  .default('port', 5000)
  .argv;

var mock = require('./src/mock.js').mock;

mock(argv.port, process.cwd + "/" + argv.config);