/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const ms = require('ms');

/**
 *
 * @param model
 * @param secret
 * @param expiration
 * @param callback
 */
function sign(model, secret, expiration, callback) {
  jwt.sign(model, secret, { expiresIn: ms(expiration || 999999999) }, (error, token) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, token);
  });
}

module.exports = sign;
