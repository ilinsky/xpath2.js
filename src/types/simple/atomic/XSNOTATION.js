/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSNOTATION() {

};

cXSNOTATION.prototype	= new cXSAnyAtomicType;

cXSNOTATION.cast	= function(vValue) {
	throw new cXPath2Error("XPST0017"
//->Debug
			, "Abstract type used in constructor function xs:NOTATION"
//<-Debug
	);	//  {http://www.w3.org/2001/XMLSchema}NOTATION
};

//
fXPath2StaticContext_defineSystemDataType("NOTATION",	cXSNOTATION);

