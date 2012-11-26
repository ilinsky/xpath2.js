/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cEvaluator() {

};

cEvaluator.prototype.defaultStaticContext	= new cStaticContext;

cEvaluator.prototype.compile	= function(sExpression, oStaticContext) {
	return new cExpression(sExpression, oStaticContext || this.defaultStaticContext);
};

cEvaluator.prototype.resolve	= function(sExpression, vItem, oStaticContext, oScope, oDOMAdapter) {
	//
	if (!oStaticContext)
		oStaticContext	= this.defaultStaticContext;
	// Create item of known type
	if (typeof vItem == "undefined" || vItem == null)
		vItem	= null;
	else
	if (typeof vItem == "boolean")
		vItem	= new cXSBoolean(vItem);
	else
	if (typeof vItem == "number") {
		if (fIsNaN(vItem) ||!fIsFinite(vItem))
			vItem	= new cXSDouble(vItem);
		else
			vItem	= fNumericLiteral_parseValue(cString(vItem));
	}
	else
	if (!(oDOMAdapter || cDOMAdapter.prototype).isNode(vItem) &&!(vItem instanceof cXSAnyAtomicType))
		vItem	= new cXSString(cString(vItem));

	return this.compile(sExpression, oStaticContext).resolve(new cDynamicContext(oStaticContext, vItem, oScope, oDOMAdapter));
};