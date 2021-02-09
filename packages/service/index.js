const { NODE_ENV } = process.env;
if (NODE_ENV === 'development') {
  require('./src');
} else {
  require('./dist');
}
