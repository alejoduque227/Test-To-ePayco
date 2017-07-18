const communication = require('../../Util/ExternalCommunication')
function getGiph(req, res, next) {

    const url = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=2fb50c23eb414b62813792b710f4b195&limit=200";

    communication.callGet(url, function (err, data) {
        const response = JSON.parse(data)

        res.json(response.data).end()
    })

}


module.exports = getGiph
