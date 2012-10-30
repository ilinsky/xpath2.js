/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

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
cFunctionCall.functions["boolean"]	= function(oSequence1) {
	if (!arguments.length)
		throw new cXPath2Error("XPST0017");
	return new cXPath2Sequence(oSequence1.toBoolean());
};

// fn:index-of($seqParam as xs:anyAtomicType*, $srchParam as xs:anyAtomicType) as xs:integer*
// fn:index-of($seqParam as xs:anyAtomicType*, $srchParam as xs:anyAtomicType, $collation as xs:string) as xs:integer*
cFunctionCall.functions["index-of"]	= function(oSequence1, oSequence2, oSequence3) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");

	var oSequence	= new cXPath2Sequence;
	if (oSequence1.isEmpty())
		return oSequence;

	if (oSequence2.isEmpty())
		return oSequence;

	// TODO: Implement collation

	var oValue	= oSequence2.items[0];
	for (var nIndex = 0, nLength = oSequence1.items.length; nIndex < nLength; nIndex++)
		if (oSequence1.items[nIndex] == oValue)
			oSequence.add(nIndex + 1);

	return oSequence;
};

// fn:empty($arg as item()*) as xs:boolean
cFunctionCall.functions["empty"]	= function(oSequence1) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	return new cXPath2Sequence(oSequence1.isEmpty());
};

// fn:exists($arg as item()*) as xs:boolean
cFunctionCall.functions["exists"]	= function(oSequence1) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	return new cXPath2Sequence(!oSequence1.isEmpty());
};

// fn:distinct-values($arg as xs:anyAtomicType*) as xs:anyAtomicType*
// fn:distinct-values($arg as xs:anyAtomicType*, $collation as xs:string) as xs:anyAtomicType*
cFunctionCall.functions["distinct-values"]	= function(oSequence1, oSequence2) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	var oSequence	= new cXPath2Sequence;
	if (oSequence1.isEmpty())
		return oSequence;

	// TODO: Change implementation to omit following items rather than previous ones
	for (var nIndex = 0, nLength = oSequence1.items.length, oValue, bFound; nIndex < nLength; nIndex++) {
		bFound	= false;
		oValue	= oSequence1.items[nIndex];
		for (var nRightIndex = nIndex + 1; (nRightIndex < nLength) &&!bFound; nRightIndex++)
			if (oValue === oSequence1.items[nRightIndex])
				bFound	= true;
		if (!bFound)
			oSequence.add(oValue);
	}

	return oSequence;
};

// fn:insert-before($target as item()*, $position as xs:integer, $inserts as item()*) as item()*
cFunctionCall.functions["insert-before"]	= function(oSequence1, oSequence2, oSequence3) {
	if (arguments.length < 3)
		throw new cXPath2Error("XPST0017");

	if (oSequence1.isEmpty())
		return oSequence3;
	if (oSequence3.isEmpty())
		return oSequence1;

	var nLength 	= oSequence1.items.length,
		nPosition	= oSequence2.toNumber();
	if (nPosition < 1)
		nPosition	= 1;
	else
	if (nPosition > nLength)
		nPosition	= nLength + 1;

	var oSequence	=  new cXPath2Sequence;
	for (var nIndex = 0; nIndex < nLength; nIndex++) {
		if (nPosition == nIndex + 1)
			oSequence.add(oSequence3);
		oSequence.add(oSequence1.items[nIndex]);
	}
	if (nPosition == nIndex + 1)
		oSequence.add(oSequence3);

	return oSequence;
};

// fn:remove($target as item()*, $position as xs:integer) as item()*
cFunctionCall.functions["remove"]	= function(oSequence1, oSequence2) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");

	var oSequence	= new cXPath2Sequence;
	if (oSequence1.isEmpty())
		return oSequence;

	var nLength 	= oSequence1.items.length,
		nPosition	= oSequence2.toNumber();

	if (nPosition < 1 || nPosition > nLength)
		return oSequence1;

	var oSequence	=  new cXPath2Sequence;
	for (var nIndex = 0; nIndex < nLength; nIndex++)
		if (nPosition != nIndex + 1)
			oSequence.add(oSequence1.items[nIndex]);

	return oSequence;
};

// fn:reverse($arg as item()*) as item()*
cFunctionCall.functions["reverse"]	= function(oSequence1) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	oSequence1.items.reverse();

	return oSequence1;
};

// fn:subsequence($sourceSeq as item()*, $startingLoc as xs:double) as item()*
// fn:subsequence($sourceSeq as item()*, $startingLoc as xs:double, $length as xs:double) as item()*
cFunctionCall.functions["subsequence"]	= function(oSequence1, oSequence2, oSequence3) {
	if (arguments.length < 2)
		throw new cXPath2Error("XPST0017");

	var nPosition	= cMath.round(oSequence2.toNumber()),
		nLength		= arguments.length > 2 ? cMath.round(oSequence3.toNumber()) : oSequence1.items.length - nPosition + 1;

	// TODO: Handle out-of-range position and length values
	var oSequence	= new cXPath2Sequence(oSequence1);
	oSequence.items	= oSequence.items.slice(nPosition - 1, nPosition - 1 + nLength);

	return oSequence;
};

// fn:unordered($sourceSeq as item()*) as item()*
cFunctionCall.functions["unordered"]	= function(oSequence1) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	return oSequence1;
};


// 15.2 Functions That Test the Cardinality of Sequences
// fn:zero-or-one($arg as item()*) as item()?
cFunctionCall.functions["zero-or-one"]	= function(oSequence1) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	if (oSequence1.length > 1)
		throw new cXPath2Error("FORG0003");

	return oSequence1;
};

// fn:one-or-more($arg as item()*) as item()+
cFunctionCall.functions["one-or-more"]	= function(oSequence1) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	if (oSequence1.length < 1)
		throw new cXPath2Error("FORG0004");

	return oSequence1;
};

// fn:exactly-one($arg as item()*) as item()
cFunctionCall.functions["exactly-one"]	= function(oSequence1) {
	if (arguments.length < 1)
		throw new cXPath2Error("XPST0017");

	if (oSequence1.length != 1)
		throw new cXPath2Error("FORG0005")

	return oSequence1;
};


// 15.3 Equals, Union, Intersection and Except
// fn:deep-equal($parameter1 as item()*, $parameter2 as item()*) as xs:boolean
// fn:deep-equal($parameter1 as item()*, $parameter2 as item()*, $collation as string) as xs:boolean
cFunctionCall.functions["deep-equal"]	= function(oSequence1, oSequence2, oSequence3) {
	throw "Function '" + "deep-equal" + "' not implemented";
};


// 15.4 Aggregate Functions
// fn:count($arg as item()*) as xs:integer
cFunctionCall.functions["count"]	= function(oSequence1) {
	if (!arguments.length)
		throw new cXPath2Error("XPST0017");
	return new cXPath2Sequence(oSequence1.items.length);
};

// fn:avg($arg as xs:anyAtomicType*) as xs:anyAtomicType?
cFunctionCall.functions["avg"]	= function(oSequence1) {
	if (!arguments.length)
		throw new cXPath2Error("XPST0017");

	if (oSequence1.isEmpty())
		return new cXPath2Sequence;

	var nValue	= 0;
	for (var nIndex = 0, nLength = oSequence1.items.length; nIndex < nLength; nIndex++)
		nValue	+= new cXPath2Sequence(oSequence1.items[nIndex]).toNumber();

	return new cXPath2Sequence(nValue / nLength);
};

// fn:max($arg as xs:anyAtomicType*) as xs:anyAtomicType?
// fn:max($arg as xs:anyAtomicType*, $collation as string) as xs:anyAtomicType?
cFunctionCall.functions["max"]	= function(oSequence1, oSequence2) {
	if (!arguments.length)
		throw new cXPath2Error("XPST0017");

	if (oSequence1.isEmpty())
		return new cXPath2Sequence;

	// TODO: Implement collation

	// Atomize sequence
	oSequence1	= cXPath2Sequence.atomize(oSequence1);

	//
	var oItem	= oSequence1.items[0];
	for (var nIndex = 1, nLength = oSequence1.items.length; nIndex < nLength; nIndex++)
		if (cComparisonExpr.ValueComp.operators['ge'](oSequence1.items[nIndex], oItem))
			oItem	= oSequence1.items[nIndex];

	return new cXPath2Sequence(oItem);
};

// fn:min($arg as xs:anyAtomicType*) as xs:anyAtomicType?
// fn:min($arg as xs:anyAtomicType*, $collation as string) as xs:anyAtomicType?
cFunctionCall.functions["min"]	= function(oSequence1, oSequence2) {
	if (!arguments.length)
		throw new cXPath2Error("XPST0017");

	if (oSequence1.isEmpty())
		return new cXPath2Sequence;

	// TODO: Implement collation

	// Atomize sequence
	oSequence1	= cXPath2Sequence.atomize(oSequence1);

	var oItem	= oSequence1.items[0];
	for (var nIndex = 0, nLength = oSequence1.items.length; nIndex < nLength; nIndex++)
		if (cComparisonExpr.ValueComp.operators['le'](oSequence1.items[nIndex], oItem))
			oItem	= oSequence1.items[nIndex];

	return new cXPath2Sequence(oItem);
};

// fn:sum($arg as xs:anyAtomicType*) as xs:anyAtomicType
// fn:sum($arg as xs:anyAtomicType*, $zero as xs:anyAtomicType?) as xs:anyAtomicType?
cFunctionCall.functions["sum"]	= function(oSequence1, oSequence2) {
	if (!arguments.length)
		throw new cXPath2Error("XPST0017");

	var oSequence	= new cXPath2Sequence;
	if (oSequence1.isEmpty()) {
		if (arguments.length > 1)
			oSequence.add(oSequence2.toNumber());
		return oSequence;
	}

	// TODO: Implement collation

	var nValue	= 0;
	for (var nIndex = 0, nLength = oSequence1.items.length; nIndex < nLength; nIndex++)
		nValue	+= new cXPath2Sequence(oSequence1.items[nIndex]).toNumber();

	oSequence.add(nValue);
	return oSequence;
};


// 15.5 Functions and Operators that Generate Sequences
// fn:id($arg as xs:string*) as element()*
// fn:id($arg as xs:string*, $node as node()) as element()*
cFunctionCall.functions["id"]	= function(oSequence1, oSequence2) {
	throw "Function '" + "id" + "' not implemented";
};

// fn:idref($arg as xs:string*) as node()*
// fn:idref($arg as xs:string*, $node as node()) as node()*
cFunctionCall.functions["idref"]	= function(oSequence1, oSequence2) {
	throw "Function '" + "idref" + "' not implemented";
};

// fn:doc($uri as xs:string?) as document-node()?
cFunctionCall.functions["doc"]	= function(oSequence1) {
	throw "Function '" + "doc" + "' not implemented";
};

// fn:doc-available($uri as xs:string?) as xs:boolean
cFunctionCall.functions["doc-available"]	= function(oSequence1) {
	throw "Function '" + "doc-available" + "' not implemented";
};

// fn:collection() as node()*
// fn:collection($arg as xs:string?) as node()*
cFunctionCall.functions["collection"]	= function(oSequence1) {
	throw "Function '" + "collection" + "' not implemented";
};

// fn:element-with-id($arg as xs:string*) as element()*
// fn:element-with-id($arg as xs:string*, $node as node()) as element()*
cFunctionCall.functions["element-with-id"]	= function(oSequence1, oSequence2) {
	throw "Function '" + "element-with-id" + "' not implemented";
};
