var main = require('./lib/main'),
    fs = require('fs-extra'),
    uuid = require('node-uuid'),
    path = require('path');

module.exports = {
    parse: function(filePath, cb) {
        //setup file
        var baseFile = path.basename(filePath),
            copyPath = [
                './',
                'tmp',
                uuid.v1(),
                baseFile
            ],
            copyTo = path.join.apply(path, copyPath);

        fs.copySync(filePath, copyTo);

        main.parse(copyTo, cb)
    }
}