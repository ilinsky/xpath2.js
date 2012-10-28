function cXSTime(nHour, nMinute, nSecond, nMillisecond, nTimezone) {
	this.hour	= nHour;
	this.minute	= nMinute;
	this.second	= nSecond;
	this.millisecond= nMillisecond;
	this.timezone	= nTimezone;
};

cXSTime.RegExp	= /^(([01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d+)?|24:00:00(\.0+)?)(Z|[+\-](0\d|1[0-4]):[0-5]\d)?$/;

cXSTime.prototype	= new cXSAnyAtomicType;

cXSTime.prototype.hour		= null;
cXSTime.prototype.minute	= null;
cXSTime.prototype.second	= null;
cXSTime.prototype.millisecond	= null;
cXSTime.prototype.timezone		= null;

cXSTime.prototype.toString	= function() {
	return fXSDateTime_getTimeComponent(this)
			+ fXSDateTime_getTZComponent(this);
};

cXSTime.parse	= function(sValue) {
	if (sValue.match(cXSTime.RegExp))
		return new cXSTime;
	throw new cXPath2Error("FORG0001");
};