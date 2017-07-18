const communication = require('../../Util/ExternalCommunication')
function getGiph(req, res, next) {

    var url = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=2fb50c23eb414b62813792b710f4b195&limit=200";

    communication.callGet(url, function (err, data) {
        data = JSON.parse(data)
/*        var vector= new Array();
        for (var i=0;i <data.pagination.count; i++){
            vector[i]=data.data[i].id
        }
        console.log(vector)*/

        res.send(data).end()
    })

}


module.exports = getGiph
