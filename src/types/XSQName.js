function cXSQName(sPrefix, sLocalName, sNameSpaceURI) {
	this.prefix	= sPrefix;
	this.localName	= sLocalName;
	this.namespaceURI	= sNameSpaceURI;
};

cXSQName.RegExp	= /^(?:(?![0-9-])(?:[\w-]+)\:)?(?![0-9-])(?:[\w-]+)$/;

cXSQName.prototype.prefix	= null;
cXSQName.prototype.localName	= null;
cXSQName.prototype.namespaceURI	= null;

cXSQName.prototype.toString	= function() {
	return (this.prefix ? this.prefix + ':' : '') + this.localName;
};

cXSQName.parse	= function(sValue) {
	if (sValue.match(cXSQName.RegExp))
		return new cXSQName;
	throw new cXPath2Error("FORG0001");
};