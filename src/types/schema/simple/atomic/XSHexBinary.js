var cException = require('./../../../../classes/Exception');

var cXSConstants = require('./../../XSConstants');

var cXSAnySimpleType = require('./../../XSAnySimpleType');
var cXSAnyAtomicType = require('./../XSAnyAtomicType');
var cXSString = require('./XSString');

var fWindow_atob = global.atob;

var cString = global.String;
var fString_trim = function (sValue) {
	return cString(sValue).trim();
};

function cXSHexBinary(sValue) {
	this.value	= sValue;
};

cXSHexBinary.prototype	= new cXSAnyAtomicType;
cXSHexBinary.prototype.builtInKind		= cXSConstants.HEXBINARY_DT;
cXSHexBinary.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_HEXBINARY;

cXSHexBinary.prototype.value	= null;

cXSHexBinary.prototype.valueOf	= function() {
	return this.value;
};

cXSHexBinary.prototype.toString	= function() {
	return this.value;
};

var rXSHexBinary	= /^([0-9a-fA-F]{2})*$/;
cXSHexBinary.cast	= function(vValue) {
	if (vValue instanceof cXSHexBinary)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSHexBinary);
		if (aMatch)
			return new cXSHexBinary(aMatch[0].toUpperCase());
		throw new cException("FORG0001");
	}
	if (vValue instanceof cXSBase64Binary) {
		var sValue	= fWindow_atob(vValue.valueOf()),
			aValue	= [];
		for (var nIndex = 0, nLength = sValue.length, sLetter; nIndex < nLength; nIndex++) {
			sLetter = sValue.charCodeAt(nIndex).toString(16);
			aValue.push(new cArray(3 - sLetter.length).join('0') + sLetter);
		}
		return new cXSHexBinary(aValue.join(''));
	}
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:hexBinary can never succeed"
//<-Debug
	);
};

//
module.exports = cXSHexBinary;
