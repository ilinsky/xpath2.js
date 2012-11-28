/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSUntyped() {

};

cXSUntyped.prototype	= new cXSAnyType;
cXSUntyped.prototype.builtInKind	= cXSConstants.UNAVAILABLE_DT;