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
			if (oLeft.isEmpty())
				return new cXPath2Sequence;
			else
			if (!oLeft.isSingleton())		// Must be singleton
				throw new cXPath2Error("XPTY0004");

			var oRight	= this.right.evaluate(oContext);
			if (oRight.isEmpty())
				return new cXPath2Sequence;
			else
			if (!oRight.isSingleton())	// Must be singleton
				throw new cXPath2Error("XPTY0004");

			var oAtomizedLeft	= cXPath2Sequence.atomizeItem(oLeft.items[0]),
				oAtomizedRight	= cXPath2Sequence.atomizeItem(oRight.items[0]);

			// Compare
			switch (this.operator) {
				case '=':	return new cXPath2Sequence(oAtomizedLeft == oAtomizedRight);
				case '!=':	return new cXPath2Sequence(oAtomizedLeft != oAtomizedRight);
				case '<':	return new cXPath2Sequence(oAtomizedLeft < oAtomizedRight);
				case '<=':	return new cXPath2Sequence(oAtomizedLeft <= oAtomizedRight);
				case '>':	return new cXPath2Sequence(oAtomizedLeft > oAtomizedRight);
				case '>=':	return new cXPath2Sequence(oAtomizedLeft >= oAtomizedRight);
			}
			break;

		// Value Comp
		case 'eq':
		case 'ne':
		case 'lt':
		case 'le':
		case 'gt':
		case 'ge':
			if (oLeft.isEmpty())
				return new cXPath2Sequence;
			else
			if (!oLeft.isSingleton())		// Must be singleton
				throw new cXPath2Error("XPTY0004");

			var oRight	= this.right.evaluate(oContext);
			if (oRight.isEmpty())
				return new cXPath2Sequence;
			else
			if (!oRight.isSingleton())	// Must be singleton
				throw new cXPath2Error("XPTY0004");

			var oAtomizedLeft	= cXPath2Sequence.atomizeItem(oLeft.items[0]),
				oAtomizedRight	= cXPath2Sequence.atomizeItem(oRight.items[0]);

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
				case 'is':	return oLeft.items[0] == oRight.items[0];
				case '>>':	return oLeft.items[0].compareDocumentPosition(oRight.items[0]) & 2;
				case '<<':	return oLeft.items[0].compareDocumentPosition(oRight.items[0]) & 4;
			}
			break;
	}

	throw "InternalError: ComparisonExpr.evaluate unkown error";
};

