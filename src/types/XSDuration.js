function cXSDuration(nYear, nMonth, nDay, nHour, nMinute, nSecond, bNegative) {
	this.year	= nYear;
	this.month	= nMonth;
	this.day	= nDay;
	this.hour	= nHour;
	this.minute	= nMinute;
	this.second	= nSecond;
	this.negative	= bNegative;
};

cXSDuration.RegExp	= /^(-)?P(?:([0-9]+)Y)?(?:([0-9]+)M)?(?:([0-9]+)D)?(?:T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:((?:(?:[0-9]+(?:.[0-9]*)?)|(?:.[0-9]+)))S)?)?$/;

cXSDuration.prototype	= new cXSAnyAtomicType;

cXSDuration.prototype.year		= null;
cXSDuration.prototype.month		= null;
cXSDuration.prototype.day		= null;
cXSDuration.prototype.hour		= null;
cXSDuration.prototype.minute	= null;
cXSDuration.prototype.second	= null;
cXSDuration.prototype.negative	= null;

cXSDuration.prototype.toString	= function() {
	return (this.negative ? '-' : '') + 'P'
			+ fXSDuration_getYearMonthComponent(this)
			+ fXSDuration_getDayTimeComponent(this);
};

cXSDuration.parse	= function(sValue) {
	if (sValue.match(cXSDuration.RegExp))
		return new cXSDuration;
	throw new cXPath2Error("FORG0001");
};

function fXSDuration_getYearMonthComponent(oDuration) {
	return (oDuration.year ? oDuration.year + 'Y' : '')
			+ (oDuration.month ? oDuration.month + 'M' : '');
};

function fXSDuration_getDayTimeComponent(oDuration) {
	return (oDuration.day ? oDuration.day + 'D' : '')
			+ (oDuration.hour || oDuration.minute || oDuration.second
				? 'T'
					+ (oDuration.hour ? oDuration.hour + 'H' : '')
					+ (oDuration.minute ? oDuration.minute + 'M' : '')
					+ (oDuration.second ? oDuration.second + 'S' : '')
				: '');
};