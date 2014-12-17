var pandoc = require('./pandoc/pandoc'),
    fs = require('fs-extra'),
    path = require('path'),
    Document = require('./document/Document');

var JamaDoc = {
    parse: function(file, cb) {
        var fromExt = path.extname(file).substr(1),
            toExt = '.html',
            workingDirectory = path.dirname(path.resolve(file)),
            fileName = './' + path.basename(file),
            baseFileName = path.basename(file, path.extname(file));

            pandoc.convert(workingDirectory, fileName, toExt, function() {
                fs.readFile(path.resolve(path.join(workingDirectory, baseFileName + toExt)), function(err, data) {
                    var doc = new Document(data.toString());
                    cb(doc);
                });
            });
    }
}

module.exports = JamaDoc;