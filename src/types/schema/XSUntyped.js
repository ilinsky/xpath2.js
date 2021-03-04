/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cXSAnyType = require('./XSAnyType');
var cXSConstants = require('./XSConstants');

function cXSUntyped() {

};

cXSUntyped.prototype	= new cXSAnyType;
cXSUntyped.prototype.builtInKind	= cXSConstants.UNAVAILABLE_DT;

//
module.exports = cXSUntyped;
