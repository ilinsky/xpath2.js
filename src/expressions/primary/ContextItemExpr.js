/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

 var cException = require('./../../classes/Exception');

function cContextItemExpr() {

};

// Public members
cContextItemExpr.prototype.evaluate	= function (oContext) {
	if (oContext.item == null)
		throw new cException("XPDY0002"
//->Debug
				, "Dynamic context does not have context item initialized"
//<-Debug
		);
	//
	return [oContext.item];
};

//
module.exports = cContextItemExpr;
