var mongoose = require('mongoose');
var ChromeModel = require('./model');

exports.index = function(req, res){
    ChromeModel.find(function(err,docs) {
        if (err) return console.error(err);
        res.set('Access-Control-Allow-Origin', '*');
        res.send(docs);
    });
};

exports.new = function(req, res){
    res.send('Direct browser creation of data is not supported.');
};

exports.create = function(req, res){
    var chr = new ChromeModel(req.body);
    chr.save(function (err,chr) {
        if (err) return console.error(err);
        res.set('Access-Control-Allow-Origin', '*');
        res.send(chr);
    });
};

exports.show = function(req, res){
    // Is there a way to change the name to "url"?
    console.log(req.params);
    ChromeModel.findOne({
        _id: req.params.chromeext
    }, function (err,chr) {
        if (err) {
            res.send(500, err);
            return console.error(err);
        }
        console.log("ChromeModel retrieved.\n" + chr + "\n");
        res.set('Access-Control-Allow-Origin', '*');
        res.send(chr);
    });
};

exports.edit = function(req, res){
    res.send('Direct browser editing of data is not supported.');
};

exports.update = function(req, res){
    if (req.body.end_time) {
        ChromeModel.findOneAndUpdate({
            _id: req.params.chromeext
        }, {
            end_time: req.body.end_time
        }, function (err,chr) {
            if (err) console.log(err);
            console.log("ChromeModel updated.\n" + chr + "\n");
            res.set('Access-Control-Allow-Origin', '*');
            res.send(chr);
        });
    } else {
        err = "ChromeModel.update: No end_time parameter found"
        console.log(err);
        res.send(500, err);
    }
};

exports.destroy = function(req, res){
    ChromeModel.findOne({
        url: req.params.chromeext
    }, function (err, chr) {
        if (err) return console.error(err);
        chr.remove(function(err,c) {
            if (err) return console.error(err);
        });
        res.set('Access-Control-Allow-Origin', '*');
        res.send(chr);
    });
};

// exports.load = function(id, fn){
//     process.nextTick(function(){
//         fn(null, { title: 'Ferrets' });
//     });
// };