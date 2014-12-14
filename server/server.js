var express = require('express'),
    compress = require('compression'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

GLOBAL.React = require('react');
app.use(compress());
app.enable('view cache');
app.use("/dist", express.static(__dirname + "/../dist", { maxAge: 31557600000 }));

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

var routes = require('./routes/main.router'),
    suggest = require('./helpers/suggest.helper');

app.get('/', routes.start);
app.get('/location', routes.location);

app.param('type', function(req, res, next, name) {
    name = name.toLowerCase();
	if (name === "short" || name === "full" || name === "visual" ) {
        req.type = name;        
        next();
    } else {
        res.redirect('/');
    }
});

app.get('/:id/:type', routes.viewtype);
app.get('/:id', routes.index);
app.get('*', routes.start);

io.on('connection', function(socket){
    
    socket.on('citysearch', function(query){
        suggest(query).then(function (places) {
            io.to(socket.id).emit('cityresult', places);
        })
    });    
    socket.on('citysearchsilent', function(query){
        suggest(query).then(function (result) {
            var id = result[0].geoid;
            io.to(socket.id).emit('cityresultsilent', id);
        })        
    });
});

http.listen(8080);
