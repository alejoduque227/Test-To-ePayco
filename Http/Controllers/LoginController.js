const mysql = global.mysql


function LoginController (req, res, next) {
    console.log("estaremos entrando aqui")
    let datos = req.body
    login(datos, function (error, user) {
        if(error){
            return next(error);
        }
        res.json(user).end()
    })
}

function login(data, callback){
    const query = `select us.id, us.name from users us where us.email = "${data.email}" and us.password = "${data.password}"; `

    mysql.findOrFail(query, function (error, result) {
        if (error){
            return callback(authIncorrect(), null);
        }
        return callback(null,result)
    })

    function authIncorrect() {
        var errormessage = "error al intentar autenticarse"
        return global.generateError(errormessage,global.http.codes['Bad Request'])
    }
}

module.exports = LoginController
