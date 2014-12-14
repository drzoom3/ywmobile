var location = require('../helpers/location.helper.js');
    
module.exports = function (req, res) {
    var q = req.query;
    
    location([q.longitude, q.latitude]).then(function (data) {
        res.json(data)
    });
};
