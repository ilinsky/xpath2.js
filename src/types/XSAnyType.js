/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cXSConstants = require('./../classes/XSConstants');

function cXSAnyType() {

};

cXSAnyType.prototype.builtInKind	= cXSConstants.ANYTYPE_DT;

//
module.exports = cXSAnyType;
