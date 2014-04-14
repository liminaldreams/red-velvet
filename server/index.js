var express = require('express');
var Resource = require('express-resource');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ChromeExt = require('./chromeext/model');

var DATABASES = {
    local: 'mongodb://localhost/red-velvet',
    heroku: 'mongodb://admin:mongoDB@oceanic.mongohq.com:10043/app24111546'
}
var db_url = heroku;

var app = express();
var port = Number(process.env.PORT || 5000);;

// Express Setup
app.use(bodyParser.json());      // JSON parser

// Database Setup
mongoose.connect(db_url)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('INFO: Connected to database red-velvet.');
});

app.get('/', function(req, res) {
    res.send("<h1>Hello World!</h>");
});

app.resource('chromeext', require('./chromeext/api'));

app.listen(port);