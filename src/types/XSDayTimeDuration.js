/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXSDayTimeDuration(nDay, nHour, nMinute, nSecond, bNegative) {
	cXSDuration.call(this, 0, 0, nDay, nHour, nMinute, nSecond, bNegative);
};

cXSDayTimeDuration.RegExp	= /^(-)?P(?:([0-9]+)D)?(?:T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:((?:(?:[0-9]+(?:.[0-9]*)?)|(?:.[0-9]+)))S)?)?$/;

cXSDayTimeDuration.prototype	= new cXSDuration;

cXSDayTimeDuration.prototype.toString	= function() {
	return (this.negative ? '-' : '') + 'P'
			+ fXSDuration_getDayTimeComponent(this);
};

cXSDayTimeDuration.parse	= function(sValue) {
	if (sValue.match(cXSDayTimeDuration.RegExp))
		return new cXSDayTimeDuration;
	throw new cXPath2Error("FORG0001");
};