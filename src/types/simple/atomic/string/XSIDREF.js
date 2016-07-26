/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSIDREF(sValue) {
	this.value	= sValue;
};

cXSIDREF.prototype	= new cXSNCName;
cXSIDREF.prototype.builtInKind	= cXSConstants.IDREF_DT;

cXSIDREF.cast	= function(vValue) {
	return new cXSIDREF(cString(vValue));
};

//
fStaticContext_defineSystemDataType("IDREF",	cXSIDREF);
