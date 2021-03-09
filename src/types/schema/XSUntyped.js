/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cXSConstants = require('./XSConstants');

var cXSAnyType = require('./XSAnyType');

function cXSUntyped() {

};

cXSUntyped.prototype	= new cXSAnyType;
cXSUntyped.prototype.builtInKind	= cXSConstants.UNAVAILABLE_DT;

//
module.exports = cXSUntyped;
