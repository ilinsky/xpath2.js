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

cXSDuration.prototype.year		= null;
cXSDuration.prototype.month		= null;
cXSDuration.prototype.day		= null;
cXSDuration.prototype.hour		= null;
cXSDuration.prototype.minute	= null;
cXSDuration.prototype.second	= null;
cXSDuration.prototype.negative	= null;

cXSDuration.prototype.toString	= function() {
	return (this.negative ? '-' : '')
			+ 'P'
			+ (this.year ? this.year + 'Y' : '')
			+ (this.month ? this.month + 'M' : '')
			+ (this.day ? this.day + 'D' : '')
			+ (this.hour || this.minute || this.second
				? 'T'
					+ (this.hour ? this.hour + 'H' : '')
					+ (this.minute ? this.minute + 'M' : '')
					+ (this.second ? this.second + 'S' : '')
				: '');
};

cXSDuration.parse	= function(sValue) {
	if (sValue.match(cXSDuration.RegExp))
		return new cXSDuration;
	throw new cXPath2Error("FORG0001");
};