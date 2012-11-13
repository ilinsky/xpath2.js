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
cComparisonExpr.parse	= function (oLexer, oStaticContext) {
	var oExpr,
		oRight;
	if (oLexer.eof() ||!(oExpr = cRangeExpr.parse(oLexer, oStaticContext)))
		return;
	if (!(oLexer.peek() in cComparisonExpr.operators))
		return oExpr;

	// Comparison expression
	var sOperator	= oLexer.peek();
	oLexer.next();
	if (oLexer.eof() ||!(oRight = cRangeExpr.parse(oLexer, oStaticContext)))
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
	var oLeft	= cXPath2Sequence.atomize(oExpr.left.evaluate(oContext), oContext);
	if (oLeft.isEmpty())
		return false;

	var oRight	= cXPath2Sequence.atomize(oExpr.right.evaluate(oContext), oContext);
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

			bResult	= cComparisonExpr.ValueComp.operators[cComparisonExpr.GeneralComp.map[oExpr.operator]](vLeft, vRight, oContext);
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
	var oLeft	= cXPath2Sequence.atomize(oExpr.left.evaluate(oContext), oContext);
	if (oLeft.isEmpty())
		return null;

	if (!oLeft.isSingleton())		// Must be singleton
		throw new cXPath2Error("XPTY0004"
//->Debug
				, "Required cardinality of first operand of '" + oExpr.operator + "' is zero or one; supplied value has cardinality one or more"
//<-Debug
		);

	var oRight	= cXPath2Sequence.atomize(oExpr.right.evaluate(oContext), oContext);
	if (oRight.isEmpty())
		return null;

	if (!oRight.isSingleton())	// Must be singleton
		throw new cXPath2Error("XPTY0004"
//->Debug
				, "Required cardinality of second operand of '" + oExpr.operator + "' is zero or one; supplied value has cardinality one or more"
//<-Debug
		);

	var vLeft	= oLeft.items[0],
		vRight	= oRight.items[0];

	if (vLeft instanceof cXSUntypedAtomic)
		vLeft	= cXSString.cast(vLeft);	// cast to xs:string
	if (vRight instanceof cXSUntypedAtomic)
		vRight	= cXSString.cast(vRight);	// cast to xs:string

	//
	return cComparisonExpr.ValueComp.operators[oExpr.operator](vLeft, vRight, oContext);
};

cComparisonExpr.ValueComp.operators	= {};
cComparisonExpr.ValueComp.operators['eq']	= function(oLeft, oRight, oContext) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);

	if (cXSAnyAtomicType.isNumeric(cLeft)) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return hXPath2StaticContext_operators["numeric-equal"].call(oContext, oLeft, oRight);
	}
	else
	if (cLeft == cRight) {
		if (cLeft == cXSBoolean)
			return hXPath2StaticContext_operators["boolean-equal"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSString)
			return hXPath2StaticContext_operators["numeric-equal"].call(oContext, hXPath2StaticContext_functions['{' + "http://www.w3.org/2005/xpath-functions" + '}' + "compare"].call(oContext, new cXPath2Sequence(oLeft), new cXPath2Sequence(oRight)), 0);
		else
		if (cLeft == cXSDate)
			return hXPath2StaticContext_operators["date-equal"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSTime)
			return hXPath2StaticContext_operators["time-equal"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSDateTime)
			return hXPath2StaticContext_operators["dateTime-equal"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSDuration || cLeft == cXSYearMonthDuration || cLeft == cXSDayTimeDuration)
			return hXPath2StaticContext_operators["duration-equal"].call(oContext, oLeft, oRight);
		// skipped: Gregorian
		// skipped: xs:hexBinary
		// skipped: xs:base64Binary
		// skipped: xs:anyURI (covered by xs:string)
		else
		if (cLeft == cXSQName)
			return hXPath2StaticContext_operators["QName-equal"].call(oContext, oLeft, oRight);
	}
	else	// If types of operands are different but are duration inherited
	if (cLeft == cXSDuration || cLeft == cXSYearMonthDuration || cLeft == cXSDayTimeDuration) {
		if (cRight == cXSDuration || cRight == cXSYearMonthDuration || cRight == cXSDayTimeDuration)
			return hXPath2StaticContext_operators["duration-equal"].call(oContext, oLeft, oRight);
	}

	// skipped: xs:NOTATION
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Cannot compare values of given types"
//<-Debug
	);	// Cannot compare {type1} to {type2}
};
cComparisonExpr.ValueComp.operators['ne']	= function(oLeft, oRight, oContext) {
	return !cComparisonExpr.ValueComp.operators['eq'](oLeft, oRight, oContext);
};
cComparisonExpr.ValueComp.operators['gt']	= function(oLeft, oRight, oContext) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);
	if (cXSAnyAtomicType.isNumeric(cLeft)) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return hXPath2StaticContext_operators["numeric-greater-than"].call(oContext, oLeft, oRight);
	}
	else
	if (cLeft == cRight) {
		if (cLeft == cXSBoolean)
			return hXPath2StaticContext_operators["boolean-greater-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSString)
			return hXPath2StaticContext_operators["numeric-greater-than"].call(oContext, hXPath2StaticContext_functions['{' + "http://www.w3.org/2005/xpath-functions" + '}' + "compare"].call(oContext, new cXPath2Sequence(oLeft), new cXPath2Sequence(oRight)), 0);
		else
		if (cLeft == cXSDate)
			return hXPath2StaticContext_operators["date-greater-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSTime)
			return hXPath2StaticContext_operators["time-greater-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSDateTime)
			return hXPath2StaticContext_operators["dateTime-greater-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSYearMonthDuration)
			return hXPath2StaticContext_operators["yearMonthDuration-greater-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSDayTimeDuration)
			return hXPath2StaticContext_operators["dayTimeDuration-greater-than"].call(oContext, oLeft, oRight);
	}
	// skipped: xs:anyURI (covered by xs:string)
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Cannot compare values of given types"
//<-Debug
	);	// Cannot compare {type1} to {type2}
};
cComparisonExpr.ValueComp.operators['lt']	= function(oLeft, oRight, oContext) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);
	if (cXSAnyAtomicType.isNumeric(cLeft)) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return hXPath2StaticContext_operators["numeric-less-than"].call(oContext, oLeft, oRight);
	}
	else
	if (cLeft == cRight) {
		if (cLeft == cXSBoolean)
			return hXPath2StaticContext_operators["boolean-less-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSBoolean)
			return hXPath2StaticContext_operators["numeric-less-than"].call(oContext, hXPath2StaticContext_functions['{' + "http://www.w3.org/2005/xpath-functions" + '}' + "compare"].call(oContext, new cXPath2Sequence(oLeft), new cXPath2Sequence(oRight)), 0);
		else
		if (cLeft == cXSDate)
			return hXPath2StaticContext_operators["date-less-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSTime)
			return hXPath2StaticContext_operators["time-less-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSDateTime)
			return hXPath2StaticContext_operators["dateTime-less-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSYearMonthDuration)
			return hXPath2StaticContext_operators["yearMonthDuration-less-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSDayTimeDuration)
			return hXPath2StaticContext_operators["dayTimeDuration-less-than"].call(oContext, oLeft, oRight);
	}
	// skipped: xs:anyURI (covered by xs:string)
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Cannot compare values of given types"
//<-Debug
	);	// Cannot compare {type1} to {type2}
};
cComparisonExpr.ValueComp.operators['ge']	= function(oLeft, oRight, oContext) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);
	if (cXSAnyAtomicType.isNumeric(cLeft)) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return hXPath2StaticContext_operators["numeric-greater-than"].call(oContext, oLeft, oRight) || hXPath2StaticContext_operators["numeric-equal"].call(oContext, oLeft, oRight);
	}
	else
	if (cLeft == cRight) {
		if (cLeft == cXSBoolean)
			return !hXPath2StaticContext_operators["boolean-less-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSString)
			return hXPath2StaticContext_operators["numeric-greater-than"].call(oContext, hXPath2StaticContext_functions['{' + "http://www.w3.org/2005/xpath-functions" + '}' + "compare"].call(oContext, new cXPath2Sequence(oLeft), new cXPath2Sequence(oRight)), -1);
		else
		if (cLeft == cXSDate)
			return !hXPath2StaticContext_operators["date-less-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSTime)
			return !hXPath2StaticContext_operators["time-less-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSDateTime)
			return !hXPath2StaticContext_operators["dateTime-less-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSYearMonthDuration)
			return !hXPath2StaticContext_operators["yearMonthDuration-less-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSDayTimeDuration)
			return !hXPath2StaticContext_operators["dayTimeDuration-less-than"].call(oContext, oLeft, oRight);
	}
	// skipped: xs:anyURI (covered by xs:string)
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Cannot compare values of given types"
//<-Debug
	);	// Cannot compare {type1} to {type2}
};
cComparisonExpr.ValueComp.operators['le']	= function(oLeft, oRight, oContext) {
	var cLeft	= cXSAnyAtomicType.typeOf(oLeft),
		cRight	= cXSAnyAtomicType.typeOf(oRight);
	if (cXSAnyAtomicType.isNumeric(cLeft)) {
		if (cXSAnyAtomicType.isNumeric(cRight))
			return hXPath2StaticContext_operators["numeric-less-than"].call(oContext, oLeft, oRight) || hXPath2StaticContext_operators["numeric-equal"].call(oContext, oLeft, oRight);
	}
	else
	if (cLeft == cRight) {
		if (cLeft == cXSBoolean)
			return !hXPath2StaticContext_operators["boolean-greater-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSString)
			return hXPath2StaticContext_operators["numeric-less-than"].call(oContext, hXPath2StaticContext_functions['{' + "http://www.w3.org/2005/xpath-functions" + '}' + "compare"].call(oContext, new cXPath2Sequence(oLeft), new cXPath2Sequence(oRight)), 1);
		else
		if (cLeft == cXSDate)
			return !hXPath2StaticContext_operators["date-greater-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSTime)
			return !hXPath2StaticContext_operators["time-greater-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSDateTime)
			return !hXPath2StaticContext_operators["dateTime-greater-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSYearMonthDuration)
			return !hXPath2StaticContext_operators["yearMonthDuration-greater-than"].call(oContext, oLeft, oRight);
		else
		if (cLeft == cXSDayTimeDuration)
			return !hXPath2StaticContext_operators["dayTimeDuration-greater-than"].call(oContext, oLeft, oRight);
	}
	// skipped: xs:anyURI (covered by xs:string)
	throw new cXPath2Error("XPTY0004"
//->Debug
			, "Cannot compare values of given types"
//<-Debug
	);	// Cannot compare {type1} to {type2}
};

// Node comparison
cComparisonExpr.NodeComp	= function(oExpr, oContext) {
	var oLeft	= oExpr.left.evaluate(oContext);
	if (oLeft.isEmpty())
		return null;

	if (!oLeft.isSingleton())	// Must be singleton (A sequence of more than one item is not allowed as the first operand of '{operator}')
		throw new cXPath2Error("XPTY0004"
//->Debug
				, "Required cardinality of first operand of '" + oExpr.operator + "' is zero or one; supplied value has cardinality one or more"
//<-Debug
		);
	if (!oContext.DOMAdapter.isNode(oLeft.items[0]))
		throw new cXPath2Error("XPTY0004"
//->Debug
				, "Required item type of first operand of '" + oExpr.operator + "' is node()"
//<-Debug
		);	// Required item type of first operand of '{operator}' is node(); supplied value has item type {type2}

	var oRight	= oExpr.right.evaluate(oContext);
	if (oRight.isEmpty())
		return null;

	if (!oRight.isSingleton())	// Must be singleton (A sequence of more than one item is not allowed as the first operand of '{operator}')
		throw new cXPath2Error("XPTY0004"
//->Debug
				, "Required cardinality of second operand of '" + oExpr.operator + "' is zero or one; supplied value has cardinality one or more"
//<-Debug
		);
	if (!oContext.DOMAdapter.isNode(oRight.items[0]))
		throw new cXPath2Error("XPTY0004"
//->Debug
				, "Required item type of second operand of '" + oExpr.operator + "' is node()"
//<-Debug
		);	// Required item type of first operand of '{operator}' is node(); supplied value has item type {type2}

	return cComparisonExpr.NodeComp.operators[oExpr.operator](oLeft.items[0], oRight.items[0], oContext);
};

cComparisonExpr.NodeComp.operators	= {};
cComparisonExpr.NodeComp.operators['is']	= function(oLeft, oRight, oContext) {
	return hXPath2StaticContext_operators["is-same-node"].call(oContext, oLeft, oRight);
};
cComparisonExpr.NodeComp.operators['>>']	= function(oLeft, oRight, oContext) {
	return hXPath2StaticContext_operators["node-after"].call(oContext, oLeft, oRight);
};
cComparisonExpr.NodeComp.operators['<<']	= function(oLeft, oRight, oContext) {
	return hXPath2StaticContext_operators["node-before"].call(oContext, oLeft, oRight);
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