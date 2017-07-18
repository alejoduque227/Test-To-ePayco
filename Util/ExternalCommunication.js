const request = require('request');

/**
 *
 * @param url
 * @param headers
 * @param callback
 */
function curlGet(url,callback) {
    const options = {
        url: url,
        method: 'GET',
    };
    request(options, function (err, respond , body) {
        if (err) {
         return callback(err,null);
        }
        callback(null,respond.body);
    });
}

/**
 *
 * @param url
 * @param json
 * @param headers
 * @param callback
 */
function curlPost(url,json,headers,callback) {
    const options = {
        url: url,
        method: 'POST',
        form:json,
        headers: headers
    };
    request(options, function (err, respond , body) {
        if (err) {
            return  callback(err,null);
        }
        callback(null,respond.body);
    });
}


module.exports = {
    callGet: curlGet,
    callPost: curlPost
};
