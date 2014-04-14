var mongoose = require('mongoose');
var ChromeModel = require('./model');

exports.index = function(req, res){
    res.send('forum index');
};

exports.new = function(req, res){
    res.send('new forum');
};

exports.create = function(req, res){
    var chr = new ChromeModel(req.body);
    chr.save(function (err,chr) {
        if (err) return console.error(err);
        console.log("ChromeModel saved. URL: " + chr.url + "\n");
        res.send("ChromeModel saved. URL: " + chr.url + "\n");
    });
};

exports.show = function(req, res){
    // Is there a way to change the name to "url"?
    ChromeModel.findOne({
        url: req.params.chromeext
    }, function (err,chr) {
        if (err) return console.error(err);
        console.log("ChromeModel retrieved.\n" + chr + "\n");
        res.send(chr);
    });
};

exports.edit = function(req, res){
    res.send('edit forum ' + req.forum.title);
};

exports.update = function(req, res){
    res.send('update forum ' + req.forum.title);
};

exports.destroy = function(req, res){
    res.send('destroy forum ' + req.forum.title);
};

exports.load = function(id, fn){
    process.nextTick(function(){
        fn(null, { title: 'Ferrets' });
    });
};