/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();
var engine = require('ejs-locals');
var api = require('./routes/api.js');
// all environments
app.set('port', process.env.PORT || 3001);
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
// app.use( routes.current_user );
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// Routes
app.get('/', routes.current_user, routes.index);
app.post('/create', routes.current_user, routes.create);
app.get('/destroy/:id', routes.current_user, routes.destroy);
app.post('/update/:id', routes.current_user, routes.update);
app.get('/login', function(req, res) {
    res.render('login');
});
app.post('/checkUser', routes.login);

app.get('/api/:user_id/list', api.list);
app.post('/api/:user_id/create', api.create);
app.delete('/api/destroy/:id', api.destroy);
app.put('/api/update/:id', api.update);
app.post('/api/login', api.login);
app.post('/api/signup', api.signup);
app.get('/api/:user_id/search/:key', api.search);
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
