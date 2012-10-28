/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cComparisonExpr(oLeft, oRight, sOperator) {
	this.left	= oLeft;
	this.right	= oRight;
	this.operator	= sOperator;
};

cComparisonExpr.prototype.left	= null;
cComparisonExpr.prototype.right	= null;
cComparisonExpr.prototype.operator	= null;

// Static members
cComparisonExpr.parse	= function (oLexer, oResolver) {
	var oExpr,
		oRight;
	if (oLexer.eof() ||!(oExpr = cRangeExpr.parse(oLexer, oResolver)))
		return;
	if (!(oLexer.peek() in cComparisonExpr.operators))
		return oExpr;

	// Comparison expression
	var sOperator	= oLexer.peek();
	oLexer.next();
	if (oLexer.eof() ||!(oRight = cRangeExpr.parse(oLexer, oResolver)))
		throw "ComparisonExpr.parse: right operand missing";
	return new cComparisonExpr(oExpr, oRight, sOperator);
};

// Public members
cComparisonExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= new cXPath2Sequence,
		bResult	= cComparisonExpr.operators[this.operator](this, oContext);
	if (bResult !== null)
		oSequence.add(bResult);
	return oSequence;
};

// General comparison
cComparisonExpr.GeneralComp	= function(oExpr, oContext) {
	var oLeft	= cXPath2Sequence.atomize(oExpr.left.evaluate(oContext));
	if (oLeft.isEmpty())
		return false;

	var oRight	= cXPath2Sequence.atomize(oExpr.right.evaluate(oContext));
	if (oRight.isEmpty())
		return false;

	var bResult	= false;
	for (var nLeftIndex = 0, nLeftLength = oLeft.items.length; (nLeftIndex < nLeftLength) &&!bResult; nLeftIndex++)
		for (var nRightIndex = 0, nRightLength = oRight.items.length; (nRightIndex < nRightLength) &&!bResult; nRightIndex++)
			bResult	= cComparisonExpr.ValueComp.operators[cComparisonExpr.GeneralComp.map[oExpr.operator]](oLeft.items[nLeftIndex], oRight.items[nRightIndex]);
	return bResult;
};

cComparisonExpr.GeneralComp.map	= {
	'=':	'eq',
	'!=':	'ne',
	'>':	'gt',
	'<':	'lt',
	'>=':	'ge',
	'<=':	'le'
};

// Value comparison
cComparisonExpr.ValueComp	= function(oExpr, oContext) {
	var oLeft	= cXPath2Sequence.atomize(oExpr.left.evaluate(oContext));
	if (oLeft.isEmpty())
		return null;

	if (!oLeft.isSingleton())		// Must be singleton
		throw new cXPath2Error("XPTY0004");

	var oRight	= cXPath2Sequence.atomize(oExpr.right.evaluate(oContext));
	if (oRight.isEmpty())
		return null;

	if (!oRight.isSingleton())	// Must be singleton
		throw new cXPath2Error("XPTY0004");

	//
	return cComparisonExpr.ValueComp.operators[oExpr.operator](oLeft.items[0], oRight.items[0]);
};

cComparisonExpr.ValueComp.operators	= {};
cComparisonExpr.ValueComp.operators['eq']	= function(oLeft, oRight) {
	return oLeft == oRight;
};
cComparisonExpr.ValueComp.operators['ne']	= function(oLeft, oRight) {
	return oLeft != oRight;
};
cComparisonExpr.ValueComp.operators['lt']	= function(oLeft, oRight) {
	return oLeft < oRight;
};
cComparisonExpr.ValueComp.operators['gt']	= function(oLeft, oRight) {
	return oLeft > oRight;
};
cComparisonExpr.ValueComp.operators['le']	= function(oLeft, oRight) {
	return oLeft <= oRight;
};
cComparisonExpr.ValueComp.operators['ge']	= function(oLeft, oRight) {
	return oLeft >= oRight;
};

// Node comparison
cComparisonExpr.NodeComp	= function(oExpr, oContext) {
	var oLeft	= oExpr.left.evaluate(oContext);
	if (oLeft.isEmpty())
		return null;

	if (!oLeft.isSingleton())		// Must be singleton
		throw new cXPath2Error("XPTY0004");
	if (!cXPath2.DOMAdapter.isNode(oLeft.items[0]))
		throw new cXPath2Error("XPTY0004");

	var oRight	= oExpr.right.evaluate(oContext);
	if (oRight.isEmpty())
		return null;

	if (!oRight.isSingleton())	// Must be singleton
		throw new cXPath2Error("XPTY0004");
	if (!cXPath2.DOMAdapter.isNode(oRight.items[0]))
		throw new cXPath2Error("XPTY0004");

	return cComparisonExpr.NodeComp.operators[oExpr.operator](oLeft.items[0], oRight.items[0]);
};

cComparisonExpr.NodeComp.operators	= {};
cComparisonExpr.NodeComp.operators['is']	= function(oLeft, oRight) {
	return cXPath2.DOMAdapter.isSameNode(oLeft, oRight);
};
cComparisonExpr.NodeComp.operators['>>']	= function(oLeft, oRight) {
	return !!(cXPath2.DOMAdapter.compareDocumentPosition(oLeft, oRight) & 2);
};
cComparisonExpr.NodeComp.operators['<<']	= function(oLeft, oRight) {
	return !!(cXPath2.DOMAdapter.compareDocumentPosition(oLeft, oRight) & 4);
};

// Operators
cComparisonExpr.operators	= {
	// GeneralComp
	'=':	cComparisonExpr.GeneralComp,
	'!=':	cComparisonExpr.GeneralComp,
	'<':	cComparisonExpr.GeneralComp,
	'<=':	cComparisonExpr.GeneralComp,
	'>':	cComparisonExpr.GeneralComp,
	'>=':	cComparisonExpr.GeneralComp,
	// ValueComp
	'eq':	cComparisonExpr.ValueComp,
	'ne':	cComparisonExpr.ValueComp,
	'lt':	cComparisonExpr.ValueComp,
	'le':	cComparisonExpr.ValueComp,
	'gt':	cComparisonExpr.ValueComp,
	'ge':	cComparisonExpr.ValueComp,
	// NodeComp
	'is':	cComparisonExpr.NodeComp,
	'>>':	cComparisonExpr.NodeComp,
	'<<':	cComparisonExpr.NodeComp
};