var express = require('express');
var Resource = require('express-resource');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ChromeExt = require('./chromeext/model');
var Analysis = require('./chromeext/analysis');
// var Authentication = require('./authentication');

var DATABASES = {
    local: 'mongodb://localhost/red-velvet',
    heroku: 'mongodb://admin:mongoDB@oceanic.mongohq.com:10043/app24111546'
}
var db_url = DATABASES.heroku;

var app = express();
var port = Number(process.env.PORT || 5000);
app.settings['view engine'] = 'ejs';
app.settings.views = process.cwd() + '/server/static/html';

// Express Setup
app.use(bodyParser.json());      // JSON parser
app.use('/static', express.static('server/html'));

// Database Setup
mongoose.connect(db_url)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('INFO: Connected to database red-velvet.');
});

app.get('/', function(req, res) {
    res.render('simpletest', function(err, html) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(html);
        }
    });
});
app.get('/chromeext/average', Analysis.average);
app.get('/chromeext/count', Analysis.count);
app.get('/chromeext/total_time', Analysis.totalTime)
app.resource('chromeext', require('./chromeext/api'));

// Passport Setup, TODO to be worked on later.
// Authentication.init(app);

app.listen(port);