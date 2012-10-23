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
		op:concatenate

	15.2 Functions That Test the Cardinality of Sequences
		zero-or-one
		one-or-more
		exactly-one

	15.3 Equals, Union, Intersection and Except
		deep-equal
		op:union
		op:intersect
		op:except

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
		op:to

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
	throw "Function '" + "index-of" + "' not implemented";
};

// fn:empty($arg as item()*) as xs:boolean
cFunctionCall.functions["empty"]	= function(oSequence1) {
	throw "Function '" + "empty" + "' not implemented";
};

// fn:exists($arg as item()*) as xs:boolean
cFunctionCall.functions["exists"]	= function(oSequence1) {
	throw "Function '" + "exists" + "' not implemented";
};

// fn:distinct-values($arg as xs:anyAtomicType*) as xs:anyAtomicType*
// fn:distinct-values($arg as xs:anyAtomicType*, $collation as xs:string) as xs:anyAtomicType*
cFunctionCall.functions["distinct-values"]	= function(oSequence1, oSequence2) {
	throw "Function '" + "distinct-values" + "' not implemented";
};

// fn:insert-before($target as item()*, $position as xs:integer, $inserts as item()*) as item()*
cFunctionCall.functions["insert-before"]	= function(oSequence1, oSequence2, oSequence3) {
	throw "Function '" + "insert-before" + "' not implemented";
};

// fn:remove($target as item()*, $position as xs:integer) as item()*
cFunctionCall.functions["remove"]	= function(oSequence1, oSequence1) {
	throw "Function '" + "remove" + "' not implemented";
};

// fn:reverse($arg as item()*) as item()*
cFunctionCall.functions["reverse"]	= function(oSequence1) {
	throw "Function '" + "reverse" + "' not implemented";
};

// fn:subsequence($sourceSeq as item()*, $startingLoc as xs:double) as item()*
// fn:subsequence($sourceSeq as item()*, $startingLoc as xs:double, $length as xs:double) as item()*
cFunctionCall.functions["subsequence"]	= function(oSequence1, oSequence2, oSequence3) {
	throw "Function '" + "subsequence" + "' not implemented";
};

// fn:unordered($sourceSeq as item()*) as item()*
cFunctionCall.functions["unordered"]	= function(oSequence1) {
	throw "Function '" + "unordered" + "' not implemented";
};


// 15.2 Functions That Test the Cardinality of Sequences
// fn:zero-or-one($arg as item()*) as item()?
cFunctionCall.functions["zero-or-one"]	= function(oSequence1) {
	throw "Function '" + "zero-or-one" + "' not implemented";
};

// fn:one-or-more($arg as item()*) as item()+
cFunctionCall.functions["one-or-more"]	= function(oSequence1) {
	throw "Function '" + "one-or-more" + "' not implemented";
};

// fn:exactly-one($arg as item()*) as item()
cFunctionCall.functions["exactly-one"]	= function(oSequence1) {
	throw "Function '" + "exactly-one" + "' not implemented";
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
	throw "Function '" + "avg" + "' not implemented";
};

// fn:max($arg as xs:anyAtomicType*) as xs:anyAtomicType?
// fn:max($arg as xs:anyAtomicType*, $collation as string) as xs:anyAtomicType?
cFunctionCall.functions["max"]	= function(oSequence1, oSequence2) {
	throw "Function '" + "max" + "' not implemented";
};

// fn:min($arg as xs:anyAtomicType*) as xs:anyAtomicType?
// fn:min($arg as xs:anyAtomicType*, $collation as string) as xs:anyAtomicType?
cFunctionCall.functions["min"]	= function(oSequence1, oSequence2) {
	throw "Function '" + "min" + "' not implemented";
};

// fn:sum($arg as xs:anyAtomicType*) as xs:anyAtomicType
// fn:sum($arg as xs:anyAtomicType*, $zero as xs:anyAtomicType?) as xs:anyAtomicType?
cFunctionCall.functions["sum"]	= function(oSequence1, oSequence2) {
	throw "Function '" + "sum" + "' not implemented";
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

