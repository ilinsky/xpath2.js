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

// Operators
cComparisonExpr.operators	= {
	// GeneralComp
	'=':	[],
	'!=':	[],
	'<':	[],
	'<=':	[],
	'>':	[],
	'>=':	[],
	// ValueComp
	'eq':	[],
	'ne':	[],
	'lt':	[],
	'le':	[],
	'gt':	[],
	'ge':	[],
	// NodeComp
	'is':	[],
	'>>':	[],
	'<<':	[]
};

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
	var oLeft	= this.left.evaluate(oContext);
	switch (this.operator) {
		// General Comp
		case '=':
		case '!=':
		case '<':
		case '<=':
		case '>':
		case '>=':
			oLeft	= cXPath2Sequence.atomize(oLeft);
			if (oLeft.isEmpty())
				return new cXPath2Sequence(false);

			var oRight	= this.right.evaluate(oContext);

			oRight	= cXPath2Sequence.atomize(oRight);
			if (oRight.isEmpty())
				return new cXPath2Sequence(false);

			var bResult	= false;
			for (var nLeftIndex = 0, nLeftLength = oLeft.items.length; (nLeftIndex < nLeftLength) &&!bResult; nLeftIndex++) {
				for (var nRightIndex = 0, nRightLength = oRight.items.length; (nRightIndex < nRightLength) &&!bResult; nRightIndex++) {
					// Compare
					switch (this.operator) {
						case '=':	bResult	= oLeft.items[nLeftIndex] == oRight.items[nRightIndex];	break;
						case '!=':	bResult	= oLeft.items[nLeftIndex] != oRight.items[nRightIndex];	break;
						case '<':	bResult	= oLeft.items[nLeftIndex] < oRight.items[nRightIndex];	break;
						case '<=':	bResult	= oLeft.items[nLeftIndex] <= oRight.items[nRightIndex];	break;
						case '>':	bResult	= oLeft.items[nLeftIndex] > oRight.items[nRightIndex];	break;
						case '>=':	bResult	= oLeft.items[nLeftIndex] >= oRight.items[nRightIndex];	break;
					}
				}
			}
			return new cXPath2Sequence(bResult);

		// Value Comp
		case 'eq':
		case 'ne':
		case 'lt':
		case 'le':
		case 'gt':
		case 'ge':
			oLeft	= cXPath2Sequence.atomize(oLeft);
			if (oLeft.isEmpty())
				return new cXPath2Sequence;
			else
			if (!oLeft.isSingleton())		// Must be singleton
				throw new cXPath2Error("XPTY0004");

			var oRight	= this.right.evaluate(oContext);

			oRight	= cXPath2Sequence.atomize(oRight);
			if (oRight.isEmpty())
				return new cXPath2Sequence;
			else
			if (!oRight.isSingleton())	// Must be singleton
				throw new cXPath2Error("XPTY0004");

			var oAtomizedLeft	= oLeft.items[0],
				oAtomizedRight	= oRight.items[0];

			// Compare
			switch (this.operator) {
				case 'eq':	return new cXPath2Sequence(oAtomizedLeft == oAtomizedRight);
				case 'ne':	return new cXPath2Sequence(oAtomizedLeft != oAtomizedRight);
				case 'lt':	return new cXPath2Sequence(oAtomizedLeft < oAtomizedRight);
				case 'le':	return new cXPath2Sequence(oAtomizedLeft <= oAtomizedRight);
				case 'gt':	return new cXPath2Sequence(oAtomizedLeft > oAtomizedRight);
				case 'ge':	return new cXPath2Sequence(oAtomizedLeft >= oAtomizedRight);
			}
			break;

		// Node Comp
		case 'is':
		case '>>':
		case '<<':
			if (oLeft.isEmpty())
				return new cXPath2Sequence;
			else
			if (!oLeft.isSingleton())		// Must be singleton
				throw new cXPath2Error("XPTY0004");
			else
			if (!oLeft.items[0].nodeType)
				throw new cXPath2Error("XPTY0004");

			var oRight	= this.right.evaluate(oContext);
			if (oRight.isEmpty())
				return new cXPath2Sequence;
			else
			if (!oRight.isSingleton())	// Must be singleton
				throw new cXPath2Error("XPTY0004");
			else
			if (!oRight.items[0].nodeType)
				throw new cXPath2Error("XPTY0004");

			switch (this.operator) {
				case 'is':	return new cXPath2Sequence(oLeft.items[0].isSameNode(oRight.items[0]));
				case '>>':	return new cXPath2Sequence(!!(oLeft.items[0].compareDocumentPosition(oRight.items[0]) & 2));
				case '<<':	return new cXPath2Sequence(!!(oLeft.items[0].compareDocumentPosition(oRight.items[0]) & 4));
			}
			break;
	}

	throw "InternalError: ComparisonExpr.evaluate unkown error";
};

