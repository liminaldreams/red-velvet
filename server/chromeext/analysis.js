var ChromeModel = require('./model');

exports.average = function(url) {
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
    });
    return total;
}

exports.count = function() {
    var c = {};
    ChromeModel.find(true, function(err, res) {
        console.log(res);
        res.forEach(function(doc) {
            if (c[doc.url])
                c[doc.url]++;
            else
                c[doc.url] = 1;
        });
        console.log(c);
    });
    return c;
}