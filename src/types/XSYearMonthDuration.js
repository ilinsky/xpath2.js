function cXSYearMonthDuration(nYear, nMonth, bNegative) {
	cXSDuration.call(this, nYear, nMonth, null, null, null, null, bNegative);
};

cXSYearMonthDuration.RegExp	= /^(-)?P(?:([0-9]+)Y)?(?:([0-9]+)M)?$/;

cXSYearMonthDuration.prototype	= new cXSDuration;

cXSYearMonthDuration.prototype.toString	= function() {

};

cXSYearMonthDuration.parse	= function(sValue) {
	if (sValue.match(cXSYearMonthDuration.RegExp))
		return new cXSYearMonthDuration;
	throw new cXPath2Error("FORG0001");
};