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

Document.prototype.parseTextFromHeading = function($el) {
    return $el.is(':header') ? $el.text().trim() : $el.find(':header').text().trim();
}

Document.prototype.parseContent = function() {
    var $headings = this.parseHeadings(),
        $rootHeadings = $headings.map(function(i, el) {
            return this.getRootParent(this._$(el));
        }.bind(this)),
        requirements = [];

    return $rootHeadings.map(function(i, el) {
        var $nextHeading = $rootHeadings[i + 1],
            $currentHeading = this._$(el),
            contentHtml;

        if ($nextHeading) {
            var contentHtml = $currentHeading.nextUntil($nextHeading).map(function(i, el) {
                return this._$(el).html();
            }.bind(this))

            var headingText = this.parseTextFromHeading($currentHeading);
            return {
                name: headingText,
                html: contentHtml.toArray().join('')
            }
        }
    }.bind(this)).toArray();
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
}

module.exports = Document;