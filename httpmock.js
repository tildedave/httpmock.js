var argv = require('optimist')
  .usage("Usage: $0")
  .demand(['config'])
  .default('port', 5000)
  .describe('port', 'Listen on port')
  .describe('config', 'Read config from file')
  .argv;

var mock = require('./src/mock.js').mock;

var options = {
  port : argv.port,
  file : argv.config
}

mock(options);

