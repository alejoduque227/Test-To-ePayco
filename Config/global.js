const validator = require('./validator');

global.path = require('path');
global.env = require('./env.json');
global.mysql = require('./mysql')();

global.sign = require('./sign');
global.tokenVerify = require('./tokenVerify');
global.AppError = require('../App/AppError');

global.http = {};
global.http.codes = require('./http-codes');

global.rootPath = global.path.join(__dirname, '../');

global.appPath = function appPath(usepath) {
  return global.path.join(__dirname, '..', 'App', usepath);
};

global.use = function use(path) {
  return require(`${global.rootPath}${path}`);
};

global.validate = validator.validate;

global.generateError = function generateError(message, statusCode) {
  const error = new Error(message);
  error.status = statusCode;
  return error;
};

global.request = function request(name) {
  return [require(global.path.join(__dirname, '..', 'Http', 'Request', `${name}Request`))];
};

module.exports = global;
