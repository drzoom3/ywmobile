module.exports = function (req, res) {
    var path = require('path');
    var file = path.resolve(__dirname + '../../../dist/start.html');
    res.sendFile(file);
};
