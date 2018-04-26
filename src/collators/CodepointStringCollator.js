/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cStringCollator = require('./../classes/StringCollator');

var oCodepointStringCollator	= new cStringCollator;

oCodepointStringCollator.equals	= function(sValue1, sValue2) {
	return sValue1 == sValue2;
};

oCodepointStringCollator.compare	= function(sValue1, sValue2) {
	return sValue1 == sValue2 ? 0 : sValue1 > sValue2 ? 1 :-1;
};

module.export = oCodepointStringCollator;
