var cException = require('./../../../../../classes/Exception');

var cXSConstants = require('./../../../XSConstants');
var cXSDecimal = require('./../XSDecimal');
var cXSString = require('./../XSString');

var fIsNaN = global.isNaN;

var cString = global.String;
var fString_trim = function (sValue) {
	return cString(sValue).trim();
};

function cXSInteger(nValue) {
	this.value	= nValue;
};

cXSInteger.prototype	= new cXSDecimal;
cXSInteger.prototype.builtInKind	= cXSConstants.INTEGER_DT;

var rXSInteger	= /^[-+]?[0-9]+$/;
cXSInteger.cast	= function(vValue) {
	if (vValue instanceof cXSInteger)
		return new cXSInteger(vValue.value);
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch	= fString_trim(vValue).match(rXSInteger);
		if (aMatch)
			return new cXSInteger(+vValue);
		throw new cException("FORG0001");
	}
	if (vValue instanceof cXSBoolean)
		return new cXSInteger(vValue * 1);
	if (cXSAnyAtomicType.isNumeric(vValue)) {
		if (!fIsNaN(vValue) && fIsFinite(vValue))
			return new cXSInteger(+vValue);
		throw new cException("FOCA0002"
//->Debug
				, "Cannot convert '" + vValue + "' to xs:integer"
//<-Debug
		);
	}
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:integer can never succeed"
//<-Debug
	);
};

//
module.exports = cXSInteger;
