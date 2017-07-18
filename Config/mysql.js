const _mysql = require('mysql')
const env = require('./env.json')

module.exports = function (config) {
    var mysql

    if (config === null || config === undefined) {
        mysql = _mysql.createConnection(env.mysql)
    } else {
        mysql = _mysql.createConnection(config)
    }

    mysql.select = function (sql, callback) {
        mysql.query(sql, function (error, data, fields) {
            if (error) {
                callback(error, null, null)
            } else {
                callback(null, data, fields)
            }
        })
    }

    mysql.selectOne = function (sql, callback) {
        mysql.query(sql, function (error, data, fields) {
            if (error) {
                callback(error, null)
            } else {
                callback(null, data[0])
            }
        })
    }

    mysql.insert = function (sql, callback) {
        mysql.query(sql, function (error, data, fields) {
            if (error) {
                callback(error, null)
            } else {
                callback(null, data)
            }
        })
    }

    mysql.update = function (sql, callback) {
        mysql.query(sql, function (error, data, fields) {
            if (error) {
                if (callback) return callback(error, null)
            } else {
                if (callback) return callback(null, data)
            }
        })
    }

    mysql.findOrFail = function (sql, callback) {
        mysql.query(sql, function (error, data, fields) {
            if (error) {
                return callback(error, null)
            }
            if (!data[0]) {
                error = new Error('Not found')
                return callback(error, null)
            }
            callback(null, data[0])
        })
    }

    mysql.random = function (sql, limit, callback) {
        limit = limit || 1
        sql = `${sql} order by rand() limit ${limit}`
        mysql.query(sql, function (error, data, fields) {
            if (error) {
                return callback(error, null)
            }
            if (limit == 1) {
                if (typeof data[0] == 'undefined') {
                    return callback({'message': 'the data is undefined'}, null)
                }
                return callback(null, data[0])
            }
            callback(null, data)
        })
    }

    mysql.checkConnection = function (callback) {
        mysql.query('SELECT 1', function (err, data, fields) {
            if (err)
            { callback(false) }
            else
            { callback(true) }
        })
    }

    return mysql
}
