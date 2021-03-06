var cStaticContext = require('./../../../classes/StaticContext');
var cException = require('./../../../classes/Exception');

function cAtomicType(sPrefix, sLocalName, sNameSpaceURI) {
	this.prefix			= sPrefix;
	this.localName		= sLocalName;
	this.namespaceURI	= sNameSpaceURI;
};

cAtomicType.prototype.prefix		= null;
cAtomicType.prototype.localName		= null;
cAtomicType.prototype.namespaceURI	= null;

cAtomicType.prototype.test	= function(vItem, oContext) {
	// Test
	var sUri	= (this.namespaceURI ? '{' + this.namespaceURI + '}' : '') + this.localName,
		cType	= this.namespaceURI == cStaticContext.NS_XSD ? cStaticContext.dataTypes[this.localName] : oContext.staticContext.getDataType(sUri);
	if (cType)
		return vItem instanceof cType;
	//
	throw new cException("XPST0051"
//->Debug
			, "Unknown simple type " + (this.prefix ? this.prefix + ':' : '') + this.localName
//<-Debug
	);
};

cAtomicType.prototype.cast	= function(vItem, oContext) {
	// Cast
	var sUri	= (this.namespaceURI ? '{' + this.namespaceURI + '}' : '') + this.localName,
		cType	= this.namespaceURI == cStaticContext.NS_XSD ? cStaticContext.dataTypes[this.localName] : oContext.staticContext.getDataType(sUri);
	if (cType)
		return cType.cast(vItem);
	//
	throw new cException("XPST0051"
//->Debug
			, "Unknown atomic type " + (this.prefix ? this.prefix + ':' : '') + this.localName
//<-Debug
	);
};

//
module.exports = cAtomicType;
