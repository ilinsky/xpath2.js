/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

//	Javascript objects
var cString		= window.String,
	cBoolean	= window.Boolean,
	cNumber		= window.Number,
	cObject		= window.Object,
	cArray		= window.Array,
	cRegExp		= window.RegExp,
	cDate		= window.Date,
	cFunction	= window.Function,
	cMath		= window.Math,
// Error Objects
	cError		= window.Error,
	cSyntaxError= window.SyntaxError,
	cTypeError	= window.TypeError,
//	misc
	fIsNaN		= window.isNaN,
	fIsFinite	= window.isFinite,
	nNaN		= window.NaN,
	nInfinity	= window.Infinity,
	// Functions
	fString_trim	=(function() {
		return cString.prototype.trim ? function(sValue) {return cString(sValue).trim();} : function(sValue) {
			return cString(sValue).replace(/^\s+|\s+$/g, '');
		};
	})(),
	fArray_indexOf	=(function() {
		return cArray.prototype.indexOf ? function(aValue, vItem) {return aValue.indexOf(vItem);} : function(aValue, vItem) {
			for (var nIndex = 0, nLength = aValue.length; nIndex < nLength; nIndex++)
				if (aValue[nIndex] === vItem)
					return nIndex;
			return -1;
		};
	})();

var sNS_SCHEMA	= "http://www.w3.org/2001/XMLSchema",
	sNS_XPFUNC	= "http://www.w3.org/2005/xpath-functions",
	sNS_XMLNS	= "http://www.w3.org/2000/xmlns/",
	sNS_XML		= "http://www.w3.org/XML/1998/namespace";
