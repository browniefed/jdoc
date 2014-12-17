var JamaDoc = require('../index'),
    fs = require('fs-extra'),
    htmlparser = require('htmlparser2'),
    cheerio = require('cheerio');

JamaDoc.parse('./Customer2.docx', function(convertedFile) {
    var data = fs.readFileSync(convertedFile),
        $ = cheerio.load(data.toString());


//Detect table of contents
//If none then start detecting hierarchy
//We don't necessarily need headings we just need to identify hierarchy
});