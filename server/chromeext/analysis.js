var ChromeModel = require('./model');

exports.average = function(req, res) {
    var url = req.query.url;
    var total = 0;
    ChromeModel.find({
        url: { $regex: '^'+url }
    }, function(err, entries) {
        if (err) return console.log("Analysis.average:\n" + err);
        total = entries.reduce(function(prevSum, currEntry, index, array) {
            var start = currEntry.start_time;
            var end = currEntry.end_time;
            if (start > 0 && end > 0)
                return prevSum + end - start;
            else
                // Entry time is invalid if either start_time or end_time
                // is not recorded.
                return prevSum;
        }, 0);
        res.send({ "total_time": total });
    });
}

exports.count = function(req, res) {
    var c = {};
    var d = [];
    ChromeModel.find(true, function(err, result) {
        result.forEach(function(doc) {
            if (c[doc.url])
                c[doc.url]++;
            else
                c[doc.url] = 1;
        });
        res.send(c);
    });
}

exports.totalTime = function(req, res) {
    var c = {}
    ChromeModel.find(true, function(err, result) {
        result.forEach(function(doc) {
            diff = doc.end_time - doc.start_time;
            if (doc.end_time )
            if (c[doc.url])
                c[doc.url] += diff;
            else
                c[doc.url] = diff;
        });
        res.send(c);
    });
}