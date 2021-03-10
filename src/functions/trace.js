/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cXSString = require('./../types/schema/simple/atomic/XSString');
//
var cXTItem = require('./../types/xpath/XTItem');

var fStaticContext_defineSystemFunction = require('./../classes/StaticContext').defineSystemFunction;

/*
	4 The Trace Function
		trace
*/

// fn:trace($value as item()*, $label as xs:string) as item()*
fStaticContext_defineSystemFunction("trace",		[[cXTItem, '*'], [cXSString]],	function(oSequence1, oLabel) {
	var oConsole	= global.console;
	if (oConsole && oConsole.log)
		oConsole.log(oLabel.valueOf(), oSequence1);
	return oSequence1;
});
