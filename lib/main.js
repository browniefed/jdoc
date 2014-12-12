var pandoc = require('./pandoc'),
    fs = require('fs-extra'),
    path = require('path');

var JamaDoc = {
    parse: function(file, cb) {
        debugger;
        var fromExt = path.extname(file).substr(1),
            toExt = 'html';
        fs.readFile(file, 'utf8', function(err, data) {
            debugger
            pandoc.parse(data, fromExt, toExt, function(err, data) {
                debugger;
            });
        });
    }
}

module.exports = JamaDoc;