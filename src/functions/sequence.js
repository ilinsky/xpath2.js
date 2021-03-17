/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cException = require('./../classes/Exception');
var cStaticContext = require('./../classes/StaticContext');
var cSequence = require('./../classes/Sequence');

var cComparisonExpr = require('./../expressions/comparison/ComparisonExpr');
var cMultiplicativeExpr = require('./../expressions/arithmetic/MultiplicativeExpr');
var cAdditiveExpr = require('./../expressions/arithmetic/AdditiveExpr');

var cXSUntypedAtomic = require('./../types/schema/simple/atomic/XSUntypedAtomic');
var cXSDouble = require('./../types/schema/simple/atomic/XSDouble');
var cXSInteger = require('./../types/schema/simple/atomic/integer/XSInteger');
var cXSBoolean = require('./../types/schema/simple/atomic/XSBoolean');
var cXSString = require('./../types/schema/simple/atomic/XSString');
//
var cMath = global.Math;

var cString = global.String;
var fString_trim = function (sValue) {
	return cString(sValue).trim();
};
var fArray_indexOf = function(aValue, oSubject) {
    return aValue.indexOf(oSubject);
};

/*
	15.1 General Functions and Operators on Sequences
		boolean
		index-of
		empty
		exists
		distinct-values
		insert-before
		remove
		reverse
		subsequence
		unordered

	15.2 Functions That Test the Cardinality of Sequences
		zero-or-one
		one-or-more
		exactly-one

	15.3 Equals, Union, Intersection and Except
		deep-equal

	15.4 Aggregate Functions
		count
		avg
		max
		min
		sum

	15.5 Functions and Operators that Generate Sequences
		id
		idref
		doc
		doc-available
		collection
		element-with-id

*/

// 15.1 General Functions and Operators on Sequences
// fn:boolean($arg as item()*) as xs:boolean
function fBoolean(oSequence1) {
	return new cXSBoolean(cSequence.toEBV(oSequence1, this));
};

// fn:index-of($seqParam as xs:anyAtomicType*, $srchParam as xs:anyAtomicType) as xs:integer*
// fn:index-of($seqParam as xs:anyAtomicType*, $srchParam as xs:anyAtomicType, $collation as xs:string) as xs:integer*
function fIndexOf(oSequence1, oSearch, oCollation) {
	if (!oSequence1.length || oSearch == null)
		return [];

	// TODO: Implement collation

	var vLeft	= oSearch;
	// Cast to XSString if Untyped
	if (vLeft instanceof cXSUntypedAtomic)
		vLeft	= cXSString.cast(vLeft);

	var oSequence	= [];
	for (var nIndex = 0, nLength = oSequence1.length, vRight; nIndex < nLength; nIndex++) {
		vRight	= oSequence1[nIndex];
		// Cast to XSString if Untyped
		if (vRight instanceof cXSUntypedAtomic)
			vRight	= cXSString.cast(vRight);
		//
		if (vRight.valueOf() === vLeft.valueOf())
			oSequence.push(new cXSInteger(nIndex + 1));
	}

	return oSequence;
};

// fn:empty($arg as item()*) as xs:boolean
function fEmpty(oSequence1) {
	return new cXSBoolean(!oSequence1.length);
};

// fn:exists($arg as item()*) as xs:boolean
function fExists(oSequence1) {
	return new cXSBoolean(!!oSequence1.length);
};

// fn:distinct-values($arg as xs:anyAtomicType*) as xs:anyAtomicType*
// fn:distinct-values($arg as xs:anyAtomicType*, $collation as xs:string) as xs:anyAtomicType*
function fDistinctValues(oSequence1, oCollation) {
	if (arguments.length > 1)
		throw "Collation parameter in function '" + "distinct-values" + "' is not implemented";

	if (!oSequence1.length)
		return null;

	var oSequence	= [];
	for (var nIndex = 0, nLength = oSequence1.length, vLeft; nIndex < nLength; nIndex++) {
		vLeft	= oSequence1[nIndex];
		// Cast to XSString if Untyped
		if (vLeft instanceof cXSUntypedAtomic)
			vLeft	= cXSString.cast(vLeft);
		for (var nRightIndex = 0, nRightLength = oSequence.length, vRight, bFound = false; (nRightIndex < nRightLength) &&!bFound; nRightIndex++) {
			vRight	= oSequence[nRightIndex];
			// Cast to XSString if Untyped
			if (vRight instanceof cXSUntypedAtomic)
				vRight	= cXSString.cast(vRight);
			//
			if (vRight.valueOf() === vLeft.valueOf())
				bFound	= true;
		}
		if (!bFound)
			oSequence.push(oSequence1[nIndex]);
	}

	return oSequence;
};

// fn:insert-before($target as item()*, $position as xs:integer, $inserts as item()*) as item()*
function fInsertBefore(oSequence1, oPosition, oSequence3) {
	if (!oSequence1.length)
		return oSequence3;
	if (!oSequence3.length)
		return oSequence1;

	var nLength 	= oSequence1.length,
		nPosition	= oPosition.valueOf();
	if (nPosition < 1)
		nPosition	= 1;
	else
	if (nPosition > nLength)
		nPosition	= nLength + 1;

	var oSequence	=  [];
	for (var nIndex = 0; nIndex < nLength; nIndex++) {
		if (nPosition == nIndex + 1)
			oSequence	= oSequence.concat(oSequence3);
		oSequence.push(oSequence1[nIndex]);
	}
	if (nPosition == nIndex + 1)
		oSequence	= oSequence.concat(oSequence3);

	return oSequence;
};

// fn:remove($target as item()*, $position as xs:integer) as item()*
function fRemove(oSequence1, oPosition) {
	if (!oSequence1.length)
		return [];

	var nLength 	= oSequence1.length,
		nPosition	= oPosition.valueOf();

	if (nPosition < 1 || nPosition > nLength)
		return oSequence1;

	var oSequence	=  [];
	for (var nIndex = 0; nIndex < nLength; nIndex++)
		if (nPosition != nIndex + 1)
			oSequence.push(oSequence1[nIndex]);

	return oSequence;
};

// fn:reverse($arg as item()*) as item()*
function fReverse(oSequence1) {
	oSequence1.reverse();

	return oSequence1;
};

// fn:subsequence($sourceSeq as item()*, $startingLoc as xs:double) as item()*
// fn:subsequence($sourceSeq as item()*, $startingLoc as xs:double, $length as xs:double) as item()*
function fSubsequence(oSequence1, oStart, oLength) {
	var nPosition	= cMath.round(oStart),
		nLength		= arguments.length > 2 ? cMath.round(oLength) : oSequence1.length - nPosition + 1;

	// TODO: Handle out-of-range position and length values
	return oSequence1.slice(nPosition - 1, nPosition - 1 + nLength);
};

// fn:unordered($sourceSeq as item()*) as item()*
function fUnordered(oSequence1) {
	return oSequence1;
};


// 15.2 Functions That Test the Cardinality of Sequences
// fn:zero-or-one($arg as item()*) as item()?
function fZeroOrOne(oSequence1) {
	if (oSequence1.length > 1)
		throw new cException("FORG0003");

	return oSequence1;
};

// fn:one-or-more($arg as item()*) as item()+
function fOneOrMore(oSequence1) {
	if (!oSequence1.length)
		throw new cException("FORG0004");

	return oSequence1;
};

// fn:exactly-one($arg as item()*) as item()
function fExactlyOne(oSequence1) {
	if (oSequence1.length != 1)
		throw new cException("FORG0005");

	return oSequence1;
};


// 15.3 Equals, Union, Intersection and Except
// fn:deep-equal($parameter1 as item()*, $parameter2 as item()*) as xs:boolean
// fn:deep-equal($parameter1 as item()*, $parameter2 as item()*, $collation as string) as xs:boolean
function fDeepEqual(oSequence1, oSequence2, oCollation) {
	throw "Function '" + "deep-equal" + "' not implemented";
};


// 15.4 Aggregate Functions
// fn:count($arg as item()*) as xs:integer
function fCount(oSequence1) {
	return new cXSInteger(oSequence1.length);
};

// fn:avg($arg as xs:anyAtomicType*) as xs:anyAtomicType?
function fAvg(oSequence1) {
	if (!oSequence1.length)
		return null;

	//
	try {
		var vValue	= oSequence1[0];
		if (vValue instanceof cXSUntypedAtomic)
			vValue	= cXSDouble.cast(vValue);
		for (var nIndex = 1, nLength = oSequence1.length, vRight; nIndex < nLength; nIndex++) {
			vRight	= oSequence1[nIndex];
			if (vRight instanceof cXSUntypedAtomic)
				vRight	= cXSDouble.cast(vRight);
			vValue	= cAdditiveExpr.operators['+'](vValue, vRight, this);
		}
		return cMultiplicativeExpr.operators['div'](vValue, new cXSInteger(nLength), this);
	}
	catch (e) {
		// XPTY0004: Arithmetic operator is not defined for provided arguments
		throw e.code != "XPTY0004" ? e : new cException("FORG0006"
//->Debug
				, "Input to avg() contains a mix of types"
//<-Debug
		);
	}
};

// fn:max($arg as xs:anyAtomicType*) as xs:anyAtomicType?
// fn:max($arg as xs:anyAtomicType*, $collation as string) as xs:anyAtomicType?
function fMax(oSequence1, oCollation) {
	if (!oSequence1.length)
		return null;

	// TODO: Implement collation

	//
	try {
		var vValue	= oSequence1[0];
		if (vValue instanceof cXSUntypedAtomic)
			vValue	= cXSDouble.cast(vValue);
		for (var nIndex = 1, nLength = oSequence1.length, vRight; nIndex < nLength; nIndex++) {
			vRight	= oSequence1[nIndex];
			if (vRight instanceof cXSUntypedAtomic)
				vRight	= cXSDouble.cast(vRight);
			if (cComparisonExpr.vcOperators['ge'](vRight, vValue, this).valueOf())
				vValue	= vRight;
		}
		return vValue;
	}
	catch (e) {
		// XPTY0004: Cannot compare {type1} with {type2}
		throw e.code != "XPTY0004" ? e : new cException("FORG0006"
//->Debug
				, "Input to max() contains a mix of not comparable values"
//<-Debug
		);
	}
};

// fn:min($arg as xs:anyAtomicType*) as xs:anyAtomicType?
// fn:min($arg as xs:anyAtomicType*, $collation as string) as xs:anyAtomicType?
function fMin(oSequence1, oCollation) {
	if (!oSequence1.length)
		return null;

	// TODO: Implement collation

	//
	try {
		var vValue	= oSequence1[0];
		if (vValue instanceof cXSUntypedAtomic)
			vValue	= cXSDouble.cast(vValue);
		for (var nIndex = 1, nLength = oSequence1.length, vRight; nIndex < nLength; nIndex++) {
			vRight	= oSequence1[nIndex];
			if (vRight instanceof cXSUntypedAtomic)
				vRight	= cXSDouble.cast(vRight);
			if (cComparisonExpr.vcOperators['le'](vRight, vValue, this).valueOf())
				vValue	= vRight;
			}
		return vValue;
	}
	catch (e) {
		// Cannot compare {type1} with {type2}
		throw e.code != "XPTY0004" ? e : new cException("FORG0006"
//->Debug
				, "Input to min() contains a mix of not comparable values"
//<-Debug
		);
	}
};

// fn:sum($arg as xs:anyAtomicType*) as xs:anyAtomicType
// fn:sum($arg as xs:anyAtomicType*, $zero as xs:anyAtomicType?) as xs:anyAtomicType?
function fSum(oSequence1, oZero) {
	if (!oSequence1.length) {
		if (arguments.length > 1)
			return oZero;
		else
			return new cXSDouble(0);
	}

	// TODO: Implement collation

	//
	try {
		var vValue	= oSequence1[0];
		if (vValue instanceof cXSUntypedAtomic)
			vValue	= cXSDouble.cast(vValue);
		for (var nIndex = 1, nLength = oSequence1.length, vRight; nIndex < nLength; nIndex++) {
			vRight	= oSequence1[nIndex];
			if (vRight instanceof cXSUntypedAtomic)
				vRight	= cXSDouble.cast(vRight);
			vValue	= cAdditiveExpr.operators['+'](vValue, vRight, this);
		}
		return vValue;
	}
	catch (e) {
		// XPTY0004: Arithmetic operator is not defined for provided arguments
		throw e.code != "XPTY0004" ? e : new cException("FORG0006"
//->Debug
				, "Input to sum() contains a mix of types"
//<-Debug
		);
	}
};


// 15.5 Functions and Operators that Generate Sequences
// fn:id($arg as xs:string*) as element()*
// fn:id($arg as xs:string*, $node as node()) as element()*
function fId(oSequence1, oNode) {
	if (arguments.length < 2) {
		if (!this.DOMAdapter.isNode(this.item))
			throw new cException("XPTY0004"
//->Debug
					, "id() function called when the context item is not a node"
//<-Debug
			);
		oNode	= this.item;
	}

	// Get root node and check if it is Document
	var oDocument	= cStaticContext.functions["root"].call(this, oNode);
	if (this.DOMAdapter.getProperty(oDocument, "nodeType") != 9)
		throw new cException("FODC0001");

	// Search for elements
	var oSequence	= [];
	for (var nIndex = 0; nIndex < oSequence1.length; nIndex++)
		for (var nRightIndex = 0, aValue = fString_trim(oSequence1[nIndex]).split(/\s+/), nRightLength = aValue.length; nRightIndex < nRightLength; nRightIndex++)
			if ((oNode = this.DOMAdapter.getElementById(oDocument, aValue[nRightIndex])) && fArray_indexOf(oSequence, oNode) ==-1)
				oSequence.push(oNode);
	//
	return cSequence.order(oSequence, this);
};

// fn:idref($arg as xs:string*) as node()*
// fn:idref($arg as xs:string*, $node as node()) as node()*
function fIdref(oSequence1, oNode) {
	throw "Function '" + "idref" + "' not implemented";
};

// fn:doc($uri as xs:string?) as document-node()?
function fDoc(oUri) {
    if (arguments.length < 1)
        return null;
    // TODO: Check if uri is relative and resolve to base
	return this.staticContext.documents[oUri.valueOf()] || null;
};

// fn:doc-available($uri as xs:string?) as xs:boolean
function fDocAvailable(oUri) {
    // TODO: Check if uri is relative and resolve to base
	return new cXSBoolean(arguments.length > 0 && (oUri.valueOf() in this.staticContext.documents));
};

// fn:collection() as node()*
// fn:collection($arg as xs:string?) as node()*
function fCollection(oUri) {
    if (arguments.length < 1)
        return this.staticContext.defaultCollection;
    // TODO: Check if uri is relative and resolve to base
	return this.staticContext.collections[oUri.valueOf()] || null;
};

// fn:element-with-id($arg as xs:string*) as element()*
// fn:element-with-id($arg as xs:string*, $node as node()) as element()*
function fElementWithId(oSequence1, oNode) {
	throw "Function '" + "element-with-id" + "' not implemented";
};

module.exports = {
    fBoolean: fBoolean,
    fIndexOf: fIndexOf,
    fEmpty: fEmpty,
    fExists: fExists,
    fDistinctValues: fDistinctValues,
    fInsertBefore: fInsertBefore,
    fRemove: fRemove,
    fReverse: fReverse,
    fSubsequence: fSubsequence,
    fUnordered: fUnordered,
    fZeroOrOne: fZeroOrOne,
    fOneOrMore: fOneOrMore,
    fExactlyOne: fExactlyOne,
    fDeepEqual: fDeepEqual,
    fCount: fCount,
    fAvg: fAvg,
    fMax: fMax,
    fMin: fMin,
    fSum: fSum,
    fId: fId,
    fIdref: fIdref,
    fDoc: fDoc,
    fDocAvailable: fDocAvailable,
    fCollection: fCollection,
    fElementWithId: fElementWithId
};