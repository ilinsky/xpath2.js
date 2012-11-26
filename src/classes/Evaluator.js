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
cEvaluator.prototype.defaultDOMAdapter		= new cDOMAdapter;

cEvaluator.prototype.compile	= function(sExpression, oStaticContext) {
	var oLexer	= new cLexer(sExpression),
		oExpr	= fExpr_parse(oLexer, oStaticContext || this.defaultStaticContext);
	//
	if (!oLexer.eof())
		throw new cException("XPST0003"
	//->Debug
				, "Unexpected token beyond end of query"
	//<-Debug
		);
	//
	if (!oExpr)
		throw new cException("XPST0003"
	//->Debug
				, "Expected expression"
	//<-Debug
		);
	return oExpr;
};

cEvaluator.prototype.evaluate	= function(sExpression, vItem, oStaticContext, oScope, oDOMAdapter) {
	//
	if (!oStaticContext)
		oStaticContext	= this.defaultStaticContext;
	//
	if (!oDOMAdapter)
		oDOMAdapter		= this.defaultDOMAdapter;

	if (typeof vItem == "undefined")
		vItem	= null;

	// Create dynamic context
	var oContext	= new cDynamicContext(oStaticContext, vItem == null || oDOMAdapter.isNode(vItem) ? vItem : cEvaluator.js2xsd(vItem), oScope, oDOMAdapter);

	// Evaluate and convert types from XPath 2.0 to JavaScript
	var oSequence	= this.compile(sExpression, oStaticContext).evaluate(oContext),
		aReturn		= [];
	for (var nIndex = 0, nLength = oSequence.length, oItem; nIndex < nLength; nIndex++)
		aReturn[aReturn.length]	= oDOMAdapter.isNode(oItem = oSequence[nIndex]) ? oItem : cEvaluator.xsd2js(oItem);
	//
	return aReturn;
};

// Converts non-null JavaScript object to XML Schema object
cEvaluator.js2xsd	= function(vItem) {
	// Convert types from JavaScript to XPath 2.0
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
		vItem	= new cXSString(cString(vItem));
	//
	return vItem;
};

// Converts non-null XML Schema object to JavaScript object
cEvaluator.xsd2js	= function(vItem) {
	if (fXSAnyAtomicType_isNumeric(vItem))
		vItem	= vItem.valueOf();
	else
	if (vItem instanceof cXSBoolean)
		vItem	= vItem.valueOf();
	else
		vItem	= vItem.toString();
	//
	return vItem;
};