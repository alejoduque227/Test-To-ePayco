

function home (req, res) {

return res.sendFile(rootPath + 'public/index.html')
}

module.exports = home
