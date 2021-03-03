/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cItemType(oTest) {
	this.test	= oTest;
};

cItemType.prototype.test	= null;

//
module.exports = cItemType;
