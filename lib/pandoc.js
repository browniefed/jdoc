var spawn = require('child_process').spawn;


module.exports = {
    parse: function(data, from, to, cb) {
        
        var pandoc = spawn('pandoc', ['-v']);
        pandoc.stdout.on('data', function(data) {
          //data will be a binary stream if you don't cast it to a string
          console.log(data.toString());
        });
    }
}