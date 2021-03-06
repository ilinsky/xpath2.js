var cXSAnySimpleType = require('./XSAnySimpleType');

function isNumeric(vItem) {
	return vItem.primitiveKind == cXSAnySimpleType.PRIMITIVE_FLOAT || vItem.primitiveKind == cXSAnySimpleType.PRIMITIVE_DOUBLE || vItem.primitiveKind == cXSAnySimpleType.PRIMITIVE_DECIMAL;
};

module.exports = isNumeric;