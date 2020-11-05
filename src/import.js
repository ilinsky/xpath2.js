/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

//	Javascript objects
var cString		= window.String,
	cArray		= window.Array,
	cFunction	= window.Function,
	cMath		= window.Math,
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


