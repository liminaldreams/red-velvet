var mongoose = require('mongoose');
var ChromeModel = require('./model');

exports.index = function(req, res){
    ChromeModel.find(function(err,docs) {
        if (err) console.error(err);
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
        res.send(chr);
    });
};

exports.show = function(req, res){
    // Is there a way to change the name to "url"?
    ChromeModel.findOne({
        _id: req.params.chromeext
    }, function (err,chr) {
        if (err) {
            res.send(err);
            return console.error(err);
        }
        console.log("ChromeModel retrieved.\n" + chr + "\n");
        res.send(chr);
    });
};

exports.edit = function(req, res){
    res.send('Direct browser editing of data is not supported.');
};

exports.update = function(req, res){
    ChromeModel.findOne({
        _id: req.params.chromeext
    }, function (err,chr) {
        if (req.body.end_time)
            chr.end_time = req.body.end_time;
        chr.save(function (err,chr) {
            if (err) {
                res.send(err);
                return console.error(err);
            }
            console.log("ChromeModel updated.\n" + chr + "\n");
            res.send(chr);
        });
    });
};

exports.destroy = function(req, res){
    ChromeModel.findOne({
        url: req.params.chromeext
    }, function (err, chr) {
        if (err) return console.error(err);
        chr.remove(function(err,c) {
            if (err) return console.error(err);
        });
        res.send(chr);
    });
};

exports.load = function(id, fn){
    process.nextTick(function(){
        fn(null, { title: 'Ferrets' });
    });
};