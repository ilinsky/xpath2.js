function cQName(sPrefix, sLocalName, sNameSpaceURI) {
	this.prefix	= sPrefix;
	this.localName	= sLocalName;
	this.namespaceURI	= sNameSpaceURI;
};

cQName.prototype.prefix	= null;
cQName.prototype.localName	= null;
cQName.prototype.namespaceURI	= null;

cQName.prototype.toString	= function() {
	return (this.prefix ? this.prefix + ':' : '') + this.namespaceURI;
};