function cXSNormalizedString(vValue) {
	this.value	= vValue;
};

cXSNormalizedString.prototype	= new cXSString;

cXSNormalizedString.prototype.toString	= function() {
	return this.value;
};

cXSNormalizedString.cast	= function(vValue) {
	return new cXSNormalizedString(cString(vValue));
};

//
fXPath2StaticContext_defineSystemDataType("normalizedString",	cXSNormalizedString);