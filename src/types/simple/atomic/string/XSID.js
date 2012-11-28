/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSID(sValue) {
	this.value	= sValue;
};

cXSID.prototype	= new cXSNCName;
cXSID.prototype.builtInKind	= cXSConstants.ID_DT;

cXSID.cast	= function(vValue) {
	return new cXSID(cString(vValue));
};

//
fStaticContext_defineSystemDataType("ID",	cXSID);
