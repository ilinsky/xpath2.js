/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cLexer(sValue) {
	var aMatch	= sValue.match(/\$?(?:(?![0-9-])(?:\w[\w.-]*|\*):)?(?![0-9-])(?:\w[\w.-]*|\*)|\(:|:\)|\/\/|\.\.|::|\d+(?:\.\d*)?(?:[eE][+-]?\d+)?|\.\d+(?:[eE][+-]?\d+)?|"[^"]*(?:""[^"]*)*"|'[^']*(?:''[^']*)*'|<<|>>|[!<>]=|(?![0-9-])[\w-]+:\*|\s+|./g);
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
			throw new cException("XPST0003"
//->Debug
					, "Unclosed comment"
//<-Debug
			);
	}
};

cLexer.prototype.index		= 0;
cLexer.prototype.length	= 0;

cLexer.prototype.reset	= function() {
	this.index	= 0;
};

cLexer.prototype.peek	= function(nOffset) {
	return this[this.index +(nOffset || 0)] || '';
};

cLexer.prototype.next	= function(nOffset) {
	return(this.index+= nOffset || 1) < this.length;
};

cLexer.prototype.back	= function(nOffset) {
	return(this.index-= nOffset || 1) > 0;
};

cLexer.prototype.eof	= function() {
	return this.index >= this.length;
};
