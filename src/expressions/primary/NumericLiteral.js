/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cNumericLiteral(oValue) {
	this.value	= oValue;
};

cNumericLiteral.prototype	= new cLiteral;

// Integer | Decimal | Double
cNumericLiteral.parse	= function(oLexer, oStaticContext) {
	var nValue	= +oLexer.peek();
	if (!fIsNaN(nValue)) {
		oLexer.next();
		var oValue;
		if (cString(nValue).match(cXSInteger.RegExp))
			oValue	= new cXSInteger(nValue);
		else
		if (cString(nValue).match(cXSDecimal.RegExp))
			oValue	= new cXSDecimal(nValue);
		else
			oValue	= new cXSDecimal(nValue);
		return new cNumericLiteral(oValue);
	}
};