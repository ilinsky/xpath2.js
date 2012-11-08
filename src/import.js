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
	fString_trim= cString.prototype.trim || function() {
		return this.replace(/^\s+|\s+$/g, '');
	},
	nNaN		= window.NaN,
	nInfinity	= window.Infinity;