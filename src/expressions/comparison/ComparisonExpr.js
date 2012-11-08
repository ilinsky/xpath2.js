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

	var bResult	= false,
		bLeft,
		bRight,
		vLeft,
		vRight;
	for (var nLeftIndex = 0, nLeftLength = oLeft.items.length; (nLeftIndex < nLeftLength) &&!bResult; nLeftIndex++) {
		for (var nRightIndex = 0, nRightLength = oRight.items.length; (nRightIndex < nRightLength) &&!bResult; nRightIndex++) {

			vLeft	= oLeft.items[nLeftIndex];
			vRight	= oRight.items[nRightIndex];

			bLeft	= vLeft instanceof cXSUntypedAtomic;
			bRight	= vRight instanceof cXSUntypedAtomic;

			if (bLeft && bRight) {
				// Both left and right are untyped
				vLeft	= cXSString.cast(vLeft);
				vRight	= cXSString.cast(vRight);
			}
			else
			if (bLeft)
				vLeft	= cXSAnyAtomicType.typeOf(vRight).cast(vLeft);
			else
			if (bRight)
				vRight	= cXSAnyAtomicType.typeOf(vLeft).cast(vRight);

			bResult	= cComparisonExpr.ValueComp.operators[cComparisonExpr.GeneralComp.map[oExpr.operator]](vLeft, vRight);
		}
	}
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
		throw new cXPath2Error("XPTY0004", "Required cardinality of first operand of '" + oExpr.operator + "' is zero or one; supplied value has cardinality one or more");

	var oRight	= cXPath2Sequence.atomize(oExpr.right.evaluate(oContext));
	if (oRight.isEmpty())
		return null;

	if (!oRight.isSingleton())	// Must be singleton
		throw new cXPath2Error("XPTY0004", "Required cardinality of second operand of '" + oExpr.operator + "' is zero or one; supplied value has cardinality one or more");

	var vLeft	= oLeft.items[0],
		vRight	= oRight.items[0];

	if (vLeft instanceof cXSUntypedAtomic)
		vLeft	= cXSAnyAtomicType.castTo(vLeft, cXSString);	// cast to xs:string
	if (vRight instanceof cXSUntypedAtomic)
		vRight	= cXSAnyAtomicType.castTo(vRight, cXSString);	// cast to xs:string

	//
	return cComparisonExpr.ValueComp.operators[oExpr.operator](vLeft, vRight);
};

cComparisonExpr.ValueComp.operators	= {};
cComparisonExpr.ValueComp.operators['eq']	= function(oLeft, oRight) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);

	if (cXSAnyAtomicType.isNumeric(cLeft)) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return cFunctionCall.operators["numeric-equal"](oLeft, oRight);
	}
	else
	if (cLeft == cRight) {
		if (cLeft == cXSBoolean)
			return cFunctionCall.operators["boolean-equal"](oLeft, oRight);
		else
		if (cLeft == cXSString)
			return cFunctionCall.operators["numeric-equal"](cFunctionCall.functions["compare"](new cXPath2Sequence(oLeft), new cXPath2Sequence(oRight)), 0);
		else
		if (cLeft == cXSDate)
			return cFunctionCall.operators["date-equal"](oLeft, oRight);
		else
		if (cLeft == cXSTime)
			return cFunctionCall.operators["time-equal"](oLeft, oRight);
		else
		if (cLeft == cXSDateTime)
			return cFunctionCall.operators["dateTime-equal"](oLeft, oRight);
		else
		if (cLeft == cXSDuration || cLeft == cXSYearMonthDuration || cLeft == cXSDayTimeDuration)
			return cFunctionCall.operators["duration-equal"](oLeft, oRight);
		// skipped: Gregorian
		// skipped: xs:hexBinary
		// skipped: xs:base64Binary
		// skipped: xs:anyURI (covered by xs:string)
		else
		if (cLeft == cXSQName)
			return cFunctionCall.operators["QName-equal"](oLeft, oRight);
	}
	else	// If types of operands are different but are duration inherited
	if (cLeft == cXSDuration || cLeft == cXSYearMonthDuration || cLeft == cXSDayTimeDuration) {
		if (cRight == cXSDuration || cRight == cXSYearMonthDuration || cRight == cXSDayTimeDuration)
			return cFunctionCall.operators["duration-equal"](oLeft, oRight);
	}

	// skipped: xs:NOTATION
	throw new cXPath2Error("XPTY0004", "Cannot compare values of given types");	// Cannot compare {type1} to {type2}
};
cComparisonExpr.ValueComp.operators['ne']	= function(oLeft, oRight) {
	return !cComparisonExpr.ValueComp.operators['eq'](oLeft, oRight);
};
cComparisonExpr.ValueComp.operators['gt']	= function(oLeft, oRight) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);
	if (cXSAnyAtomicType.isNumeric(cLeft)) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return cFunctionCall.operators["numeric-greater-than"](oLeft, oRight);
	}
	else
	if (cLeft == cRight) {
		if (cLeft == cXSBoolean)
			return cFunctionCall.operators["boolean-greater-than"](oLeft, oRight);
		else
		if (cLeft == cXSString)
			return cFunctionCall.operators["numeric-greater-than"](cFunctionCall.functions["compare"](new cXPath2Sequence(oLeft), new cXPath2Sequence(oRight)), 0);
		else
		if (cLeft == cXSDate)
			return cFunctionCall.operators["date-greater-than"](oLeft, oRight);
		else
		if (cLeft == cXSTime)
			return cFunctionCall.operators["time-greater-than"](oLeft, oRight);
		else
		if (cLeft == cXSDateTime)
			return cFunctionCall.operators["dateTime-greater-than"](oLeft, oRight);
		else
		if (cLeft == cXSYearMonthDuration)
			return cFunctionCall.operators["yearMonthDuration-greater-than"](oLeft, oRight);
		else
		if (cLeft == cXSDayTimeDuration)
			return cFunctionCall.operators["dayTimeDuration-greater-than"](oLeft, oRight);
	}
	// skipped: xs:anyURI (covered by xs:string)
	throw new cXPath2Error("XPTY0004", "Cannot compare values of given types");	// Cannot compare {type1} to {type2}
};
cComparisonExpr.ValueComp.operators['lt']	= function(oLeft, oRight) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);
	if (cXSAnyAtomicType.isNumeric(cLeft)) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return cFunctionCall.operators["numeric-less-than"](oLeft, oRight);
	}
	else
	if (cLeft == cRight) {
		if (cLeft == cXSBoolean)
			return cFunctionCall.operators["boolean-less-than"](oLeft, oRight);
		else
		if (cLeft == cXSBoolean)
			return cFunctionCall.operators["numeric-less-than"](cFunctionCall.functions["compare"](new cXPath2Sequence(oLeft), new cXPath2Sequence(oRight)), 0);
		else
		if (cLeft == cXSDate)
			return cFunctionCall.operators["date-less-than"](oLeft, oRight);
		else
		if (cLeft == cXSTime)
			return cFunctionCall.operators["time-less-than"](oLeft, oRight);
		else
		if (cLeft == cXSDateTime)
			return cFunctionCall.operators["dateTime-less-than"](oLeft, oRight);
		else
		if (cLeft == cXSYearMonthDuration)
			return cFunctionCall.operators["yearMonthDuration-less-than"](oLeft, oRight);
		else
		if (cLeft == cXSDayTimeDuration)
			return cFunctionCall.operators["dayTimeDuration-less-than"](oLeft, oRight);
	}
	// skipped: xs:anyURI (covered by xs:string)
	throw new cXPath2Error("XPTY0004", "Cannot compare values of given types");	// Cannot compare {type1} to {type2}
};
cComparisonExpr.ValueComp.operators['ge']	= function(oLeft, oRight) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);
	if (cXSAnyAtomicType.isNumeric(cLeft)) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return cFunctionCall.operators["numeric-greater-than"](oLeft, oRight) || cFunctionCall.operators["numeric-equal"](oLeft, oRight);
	}
	else
	if (cLeft == cRight) {
		if (cLeft == cXSBoolean)
			return !cFunctionCall.operators["boolean-less-than"](oLeft, oRight);
		else
		if (cLeft == cXSString)
			return cFunctionCall.operators["numeric-greater-than"](cFunctionCall.functions["compare"](new cXPath2Sequence(oLeft), new cXPath2Sequence(oRight)), -1);
		else
		if (cLeft == cXSDate)
			return !cFunctionCall.operators["date-less-than"](oLeft, oRight);
		else
		if (cLeft == cXSTime)
			return !cFunctionCall.operators["time-less-than"](oLeft, oRight);
		else
		if (cLeft == cXSDateTime)
			return !cFunctionCall.operators["dateTime-less-than"](oLeft, oRight);
		else
		if (cLeft == cXSYearMonthDuration)
			return !cFunctionCall.operators["yearMonthDuration-less-than"](oLeft, oRight);
		else
		if (cLeft == cXSDayTimeDuration)
			return !cFunctionCall.operators["dayTimeDuration-less-than"](oLeft, oRight);
	}
	// skipped: xs:anyURI (covered by xs:string)
	throw new cXPath2Error("XPTY0004", "Cannot compare values of given types");	// Cannot compare {type1} to {type2}
};
cComparisonExpr.ValueComp.operators['le']	= function(oLeft, oRight) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);
	if (cXSAnyAtomicType.isNumeric(cLeft)) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return cFunctionCall.operators["numeric-less-than"](oLeft, oRight) || cFunctionCall.operators["numeric-equal"](oLeft, oRight);
	}
	else
	if (cLeft == cRight) {
		if (cLeft == cXSBoolean)
			return !cFunctionCall.operators["boolean-greater-than"](oLeft, oRight);
		else
		if (cLeft == cXSString)
			return cFunctionCall.operators["numeric-less-than"](cFunctionCall.functions["compare"](new cXPath2Sequence(oLeft), new cXPath2Sequence(oRight)), 1);
		else
		if (cLeft == cXSDate)
			return !cFunctionCall.operators["date-greater-than"](oLeft, oRight);
		else
		if (cLeft == cXSTime)
			return !cFunctionCall.operators["time-greater-than"](oLeft, oRight);
		else
		if (cLeft == cXSDateTime)
			return !cFunctionCall.operators["dateTime-greater-than"](oLeft, oRight);
		else
		if (cLeft == cXSYearMonthDuration)
			return !cFunctionCall.operators["yearMonthDuration-greater-than"](oLeft, oRight);
		else
		if (cLeft == cXSDayTimeDuration)
			return !cFunctionCall.operators["dayTimeDuration-greater-than"](oLeft, oRight);
	}
	// skipped: xs:anyURI (covered by xs:string)
	throw new cXPath2Error("XPTY0004", "Cannot compare values of given types");	// Cannot compare {type1} to {type2}
};

// Node comparison
cComparisonExpr.NodeComp	= function(oExpr, oContext) {
	var oLeft	= oExpr.left.evaluate(oContext);
	if (oLeft.isEmpty())
		return null;

	if (!oLeft.isSingleton())	// Must be singleton (A sequence of more than one item is not allowed as the first operand of '{operator}')
		throw new cXPath2Error("XPTY0004", "Required cardinality of first operand of '" + oExpr.operator + "' is zero or one; supplied value has cardinality one or more");
	if (!cXPath2.DOMAdapter.isNode(oLeft.items[0]))
		throw new cXPath2Error("XPTY0004", "Required item type of first operand of '" + oExpr.operator + "' is node()");	// Required item type of first operand of '{operator}' is node(); supplied value has item type {type2}

	var oRight	= oExpr.right.evaluate(oContext);
	if (oRight.isEmpty())
		return null;

	if (!oRight.isSingleton())	// Must be singleton (A sequence of more than one item is not allowed as the first operand of '{operator}')
		throw new cXPath2Error("XPTY0004", "Required cardinality of second operand of '" + oExpr.operator + "' is zero or one; supplied value has cardinality one or more");
	if (!cXPath2.DOMAdapter.isNode(oRight.items[0]))
		throw new cXPath2Error("XPTY0004", "Required item type of second operand of '" + oExpr.operator + "' is node()");	// Required item type of first operand of '{operator}' is node(); supplied value has item type {type2}

	return cComparisonExpr.NodeComp.operators[oExpr.operator](oLeft.items[0], oRight.items[0]);
};

cComparisonExpr.NodeComp.operators	= {};
cComparisonExpr.NodeComp.operators['is']	= function(oLeft, oRight) {
	return cFunctionCall.operators["is-same-node"](oLeft, oRight);
};
cComparisonExpr.NodeComp.operators['>>']	= function(oLeft, oRight) {
	return cFunctionCall.operators["node-after"](oLeft, oRight);
};
cComparisonExpr.NodeComp.operators['<<']	= function(oLeft, oRight) {
	return cFunctionCall.operators["node-before"](oLeft, oRight);
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