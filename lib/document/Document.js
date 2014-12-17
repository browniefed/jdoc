var htmlparser = require('htmlparser2'),
    cheerio = require('cheerio');

var Document = function(data) {
    this._$ = cheerio.load(data);
    this._tocReg = /([0-9\.]*?)\s(.*)\s([0-9]*?)$/
}

Document.prototype.parseTableOfContents = function() {
    var toc = {}
    this._$('a').each(function(i, el){
        var id = this._$(el).attr('id'),
            text = this._$(el).text(),
            textSplit = text.match(this._tocReg);

        if (textSplit && textSplit[1]) {
            if (textSplit[1].substr(-1) == '.') {
                textSplit[1] += '0';
            }
            toc[textSplit[1]] = textSplit[2];
        }

    }.bind(this));

    return toc;
}

Document.prototype.parseHeadings = function() {
    return this._$(':header').filter(function(i, el) {
        return !!this._$(el).text().trim()
    }.bind(this));
}

Document.prototype.parseHeadingText = function() {
    var $headings = this.parseHeadings(),
        headings = [];

    $headings.each(function(i, el) {
        headings.push(this._$(el).text());
    });
    return headings;
}

Document.prototype.parseContent = function() {
    var $headings = this.parseHeadings();
    //Get each heading
    //Traverse back to root
    //Get content between each
    //--If empty do nothing for now, that is empty requirement
    $headings.each(function(i, el) {
        var parentRoot = this.getRootParent(this._$(el)),
            nextEl,
            contentHtml = '';

        while(nextEl = parentRoot.next() && !$headings.contains(nextEl)) {
            if (!$headings.contains(nextEl)){
                contentHtml += nextEl().html();
            }
        }
        console.log(contentHtml);
        return false;
    }.bind(this));

}
/**
 * Returns the root parent of a node
 * @param {Cheerio} element
 * @returns {Cheerio} parent root element
 */
Document.prototype.getRootParent = function($el) {
    var parents = $el.parentsUntil('body');
    if (parents && parents.length) {
        return parents.last();
    }
    //$el was already at root
    return $el;
    $el.parentsU().filter(function(i, $element) {
        parents = $element.parents();
    })
}

module.exports = Document;