var JamaDoc = require('../index'),
    fs = require('fs-extra'),
    htmlparser = require('htmlparser2'),
    cheerio = require('cheerio');

JamaDoc.parse('./Customer4.docx', function(convertedDoc) {

var toc = convertedDoc.parseTableOfContents();
var headings = convertedDoc.parseHeadings();
var content = convertedDoc.parseContent();
debugger;
fs.writeJson('./content.json', content);
//Detect table of contents
//If none then start detecting hierarchy
//We don't necessarily need headings we just need to identify hierarchy
//
//Table of contents doesn't have everything
//--Get all h1,h2,h3,h4,h5, etc
//---Get back to root node
//----get content inbetween(all HTML)
//----If the next node (h1=> h2) then we have a logical break
//----This could match with table of contents but not necessarily
});