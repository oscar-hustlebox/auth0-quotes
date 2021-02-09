const { NODE_ENV } = process.env;

if (NODE_ENV === 'development') {
  module.exports = require('./src');
} else {
  module.exports = require('./dist');
}
