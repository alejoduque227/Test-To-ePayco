const jwt = require('jsonwebtoken');

/**
 *
 * @param token
 * @param secret
 * @param callback
 */
function verify(token, secret, callback) {
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, decoded);
  });
}

module.exports = verify;
