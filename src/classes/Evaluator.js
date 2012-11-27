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
	return new cExpression(sExpression, oStaticContext);
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
	var oContext	= new cDynamicContext(oStaticContext, vItem == null || oDOMAdapter.isNode(vItem) ? vItem : cStaticContext.js2xs(vItem), oScope, oDOMAdapter);

	// Evaluate and convert types from XPath 2.0 to JavaScript
	var oSequence	= this.compile(sExpression, oStaticContext).evaluate(oContext),
		aReturn		= [];
	for (var nIndex = 0, nLength = oSequence.length, oItem; nIndex < nLength; nIndex++)
		aReturn[aReturn.length]	= oDOMAdapter.isNode(oItem = oSequence[nIndex]) ? oItem : cStaticContext.xs2js(oItem);
	//
	return aReturn;
};
