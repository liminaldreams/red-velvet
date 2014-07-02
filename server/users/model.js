var mongoose = require('mongoose');

var chromeSchema = mongoose.Schema({
    username: String
    password: String
});

var ChromeExt = mongoose.model('ChromeExt', chromeSchema);
module.exports = ChromeExt