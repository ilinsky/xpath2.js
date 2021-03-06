var cException = require('./../../../../classes/Exception');

var cXSConstants = require('./../../XSConstants');

var cXSAnySimpleType = require('./../../XSAnySimpleType');
var cXSAnyAtomicType = require('./../XSAnyAtomicType');
var cXSString = require('./../atomic/XSString');

var cString = global.String;
var fString_trim = function (sValue) {
	return cString(sValue).trim();
};

function cXSAnyURI(sScheme, sAuthority, sPath, sQuery, sFragment) {
	this.scheme		= sScheme;
	this.authority	= sAuthority;
	this.path		= sPath;
	this.query		= sQuery;
	this.fragment	= sFragment;
};

cXSAnyURI.prototype	= new cXSAnyAtomicType;
cXSAnyURI.prototype.builtInKind		= cXSConstants.ANYURI_DT;
cXSAnyURI.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_ANYURI;

cXSAnyURI.prototype.scheme		= null;
cXSAnyURI.prototype.authority	= null;
cXSAnyURI.prototype.path		= null;
cXSAnyURI.prototype.query		= null;
cXSAnyURI.prototype.fragment	= null;

cXSAnyURI.prototype.toString	= function() {
	return (this.scheme ? this.scheme + ':' : '')
			+ (this.authority ? '/' + '/' + this.authority : '')
			+ (this.path ? this.path : '')
			+ (this.query ? '?' + this.query : '')
			+ (this.fragment ? '#' + this.fragment : '');
};

var rXSAnyURI	= /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;	// http://tools.ietf.org/html/rfc3986
cXSAnyURI.cast	= function(vValue) {
	if (vValue instanceof cXSAnyURI)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch;
		if (aMatch = fString_trim(vValue).match(rXSAnyURI))
			return new cXSAnyURI(aMatch[2], aMatch[4], aMatch[5], aMatch[7], aMatch[9]);
		throw new cException("FORG0001");
	}
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:anyURI can never succeed"
//<-Debug
	);
};

//
module.exports = cXSAnyURI;
