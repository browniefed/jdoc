var spawn = require('child_process').spawn,
    path = require('path');


var pdc = {
    convert: function(workingDirectory, file, convertToExt, cb) {
        var convertTo = path.basename(file, path.extname(file)) + convertToExt;
        var pandoc = spawn('pandoc', [file, '-o', convertTo, '-N', '--section-divs', '--self-contained'], {
            cwd: workingDirectory
        });

        pandoc.on('close', cb);
    }
}

module.exports = pdc;