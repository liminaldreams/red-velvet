var mongoose = require('mongoose');

var chromeSchema = mongoose.Schema({
    url: String,
    start_time: Number,
    end_time: Number,
});

var ChromeExt = mongoose.model('ChromeExt', chromeSchema);
module.exports = ChromeExt