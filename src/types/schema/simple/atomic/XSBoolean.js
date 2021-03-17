var cException = require('./../../../../classes/Exception');

var cXSConstants = require('./../../XSConstants');

var cXSAnySimpleType = require('./../../XSAnySimpleType');
var cXSAnyAtomicType = require('./../XSAnyAtomicType');
var cXSUntypedAtomic = require('./XSUntypedAtomic');
var cXSString = require('./../atomic/XSString');

var cString = global.String;
var fString_trim = function (sValue) {
	return cString(sValue).trim();
};

function cXSBoolean(bValue) {
	this.value	= bValue;
};

cXSBoolean.prototype	= new cXSAnyAtomicType;
cXSBoolean.prototype.builtInKind	= cXSConstants.BOOLEAN_DT;
cXSBoolean.prototype.primitiveKind	= cXSAnySimpleType.PRIMITIVE_BOOLEAN;

cXSBoolean.prototype.value	= null;

cXSBoolean.prototype.valueOf	= function() {
	return this.value;
};

cXSBoolean.prototype.toString	= function() {
	return cString(this.value);
};

var rXSBoolean	= /^(0|1|true|false)$/;
cXSBoolean.cast	= function(vValue) {
	if (vValue instanceof cXSBoolean)
		return vValue;
	if (vValue instanceof cXSString || vValue instanceof cXSUntypedAtomic) {
		var aMatch;
		if (aMatch = fString_trim(vValue).match(rXSBoolean))
			return new cXSBoolean(aMatch[1] == '1' || aMatch[1] == "true");
		throw new cException("FORG0001");
	}
	if (cXSAnyAtomicType.isNumeric(vValue))
		return new cXSBoolean(vValue != 0);
	//
	throw new cException("XPTY0004"
//->Debug
			, "Casting value '" + vValue + "' to xs:boolean can never succeed"
//<-Debug
	);
};

//
module.exports = cXSBoolean;
