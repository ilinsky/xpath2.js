/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPathLexer(sValue) {
	var aMatch	= sValue.match(/\$(?:(?![0-9-])(?:[\w-]+):)?(?![0-9-])(?:[\w-]+)|(?:(?![0-9-])(?:[\w-]+):)?(?![0-9-])(?:[\w-]+|\*)|\(:|:\)|\/\/|\.\.|::|\d+(?:\.\d*)?(?:[eE][+-]?\d+)?|\.\d+(?:[eE][+-]?\d+)?|"[^"]*(?:""[^"]*)*"|'[^']*(?:''[^']*)*'|<<|>>|[!<>]=|(?![0-9-])[\w-]+:\*|\s+|./g);
	if (aMatch) {
		var nStack	= 0;
		for (var nIndex = 0, nLength = aMatch.length; nIndex < nLength; nIndex++)
			if (aMatch[nIndex] == '(:')
				nStack++;
			else
			if (aMatch[nIndex] == ':)' && nStack)
				nStack--;
			else
			if (!nStack && !/^\s/.test(aMatch[nIndex]))
				this[this.length++]	= aMatch[nIndex];
		if (nStack)
			throw "XPathLexer: comments not closed";
	}
};

cXPathLexer.prototype.index		= 0;
cXPathLexer.prototype.length	= 0;

cXPathLexer.prototype.reset	= function() {
	this.index	= 0;
};

cXPathLexer.prototype.peek	= function(nOffset) {
	return this[this.index +(nOffset || 0)];
};

cXPathLexer.prototype.next	= function() {
	return ++this.index < this.length;
};

cXPathLexer.prototype.back	= function() {
	return this.index--> 0;
};

cXPathLexer.prototype.eof	= function() {
	return this.index >= this.length;
};