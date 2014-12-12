var spawn = require('child_process').spawn;


var pdc = {
    convert: function(workingDirectory, file, args) {
        var pandoc = spawn('pandoc', ['-v']);
//Spawn to working direction
//Spawn pandoc
//Build args
    }
}

module.exports = pdc;