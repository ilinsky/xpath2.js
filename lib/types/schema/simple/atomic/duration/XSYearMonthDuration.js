var cException = require('./../../../../../classes/Exception');

var cXSConstants = require('./../../../XSConstants');
var cXSDuration = require('./../XSDuration');
var cXSString = require('./../XSString');

var cString = global.String;
var fString_trim = function (sValue) {
	return cString(sValue).trim();
};

function cXSYearMonthDuration(nYear, nMonth, bNegative) {
	cXSDuration.call(this, nYear, nMonth, 0, 0, 0, 0, bNegative);
};

cXSYearMonthDuration.prototype	= new cXSDuration;
cXSYearMonthDuration.prototype.builtInKind	= cXSConstants.XT_YEARMONTHDURATION_DT;

cXSYearMonthDuration.prototype.toString	= function() {
	return (this.negative ? '-' : '') + 'P'
			+ (cXSDuration.getYearMonthComponent(this) || '0M');
};

var rXSYearMonthDuration	= /^(-)?P(?:([0-9]+)Y)?(?:([0-9]+)M)?$/;
cXSYearMonthDuration.cast	= function(vValue) {
	if (vValue instanceof cXSYearMonthDuration)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSYearMonthDuration);
		if (aMatch)
			return cXSDuration.normalizeYearMonthDuration(new cXSYearMonthDuration(+aMatch[2] || 0, +aMatch[3] || 0, aMatch[1] == '-'));
		throw new cException("FORG0001");
	}
	if (vValue.builtInKind == cXSConstants.XT_DAYTIMEDURATION_DT)
		return new cXSYearMonthDuration(0, 0);
	if (vValue instanceof cXSDuration)
		return new cXSYearMonthDuration(vValue.year, vValue.month, vValue.negative);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:yearMonthDuration can never succeed"
//<-Debug
	);
};

//
module.exports = cXSYearMonthDuration;
