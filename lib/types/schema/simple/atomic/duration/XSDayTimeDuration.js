var cException = require('./../../../../../classes/Exception');

var cXSConstants = require('./../../../XSConstants');
var cXSDuration = require('./../XSDuration');
var cXSString = require('./../XSString');

var cString = global.String;
var cMath = global.Math;

var fString_trim = function (sValue) {
	return cString(sValue).trim();
};

function cXSDayTimeDuration(nDay, nHours, nMinutes, nSeconds, bNegative) {
	cXSDuration.call(this, 0, 0, nDay, nHours, nMinutes, nSeconds, bNegative);
};

cXSDayTimeDuration.prototype	= new cXSDuration;
cXSDayTimeDuration.prototype.builtInKind	= cXSConstants.DAYTIMEDURATION_DT;

cXSDayTimeDuration.prototype.toString	= function() {
	return (this.negative ? '-' : '') + 'P'
			+ (cXSDuration.getDayTimeComponent(this) || 'T0S');
};

var rXSDayTimeDuration	= /^(-)?P(?:([0-9]+)D)?(?:T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:((?:(?:[0-9]+(?:.[0-9]*)?)|(?:.[0-9]+)))S)?)?$/;
cXSDayTimeDuration.cast	= function(vValue) {
	if (vValue instanceof cXSDayTimeDuration)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSDayTimeDuration);
		if (aMatch)
			return cXSDuration.normalizeDayTimeDuration(new cXSDayTimeDuration(+aMatch[2] || 0, +aMatch[3] || 0, +aMatch[4] || 0, +aMatch[5] || 0, aMatch[1] == '-'));
		throw new cException("FORG0001");
	}
	if (vValue.builtInKind == cXSConstants.XT_YEARMONTHDURATION_DT)
		return new cXSDayTimeDuration(0, 0, 0, 0);
	if (vValue instanceof cXSDuration)
		return new cXSDayTimeDuration(vValue.day, vValue.hours, vValue.minutes, vValue.seconds, vValue.negative);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:dayTimeDuration can never succeed"
//<-Debug
	);
};

// Utilities

// xs:dayTimeDuration to/from seconds
cXSDayTimeDuration.toSeconds = function(oDuration) {
	return (((oDuration.day * 24 + oDuration.hours) * 60 + oDuration.minutes) * 60 + oDuration.seconds) * (oDuration.negative ? -1 : 1);
};

cXSDayTimeDuration.fromSeconds = function(nValue) {
	var bNegative	=(nValue = cMath.round(nValue)) < 0,
		nDays	= ~~((nValue = cMath.abs(nValue)) / 86400),
		nHours	= ~~((nValue -= nDays * 3600 * 24) / 3600),
		nMinutes= ~~((nValue -= nHours * 3600) / 60),
		nSeconds	= nValue -= nMinutes * 60;
	return new cXSDayTimeDuration(nDays, nHours, nMinutes, nSeconds, bNegative);
};

//
module.exports = cXSDayTimeDuration;
