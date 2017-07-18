function testConnection (req, res) {
    global.mysql.checkConnection(function (response) {
        if (response) {
            res.statusCode = 200
            res.end()
        } else {
            res.statusCode = 503
            res.end()
        }
    })
}

module.exports = testConnection
