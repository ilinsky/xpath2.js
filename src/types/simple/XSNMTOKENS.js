/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cXSAnySimpleType = require('./../XSAnySimpleType');

function cXSNMTOKENS() {

};

cXSNMTOKENS.prototype	= new cXSAnySimpleType;

//
module.exports = cXSNMTOKENS;
