/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSENTITY(sValue) {
	this.value	= sValue;
};

cXSENTITY.prototype	= new cXSNCName;
cXSENTITY.prototype.builtInKind	= cXSConstants.ENTITY_DT;

cXSENTITY.cast	= function(vValue) {
	return new cXSENTITY(cString(vValue));
};

//
fStaticContext_defineSystemDataType("ENTITY",	cXSENTITY);
