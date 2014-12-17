var pandoc = require('./pandoc/pandoc'),
    fs = require('fs-extra'),
    path = require('path');

var JamaDoc = {
    parse: function(file, cb) {
        var fromExt = path.extname(file).substr(1),
            toExt = '.html',
            workingDirectory = path.dirname(path.resolve(file)),
            fileName = './' + path.basename(file),
            baseFileName = path.basename(file, path.extname(file));

            pandoc.convert(workingDirectory, fileName, toExt, function() {
                cb(path.resolve(path.join(workingDirectory, baseFileName + toExt)));
            });
    }
}

module.exports = JamaDoc;