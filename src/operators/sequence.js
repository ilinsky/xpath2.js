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
		op:concatenate

	15.3 Equals, Union, Intersection and Except
		op:union
		op:intersect
		op:except

	15.5 Functions and Operators that Generate Sequences
		op:to

*/

// 15.1 General Functions and Operators on Sequences
// op:concatenate($seq1 as item()*, $seq2 as item()*) as item()*
cFunctionCall.operators["concatenate"]	= function(oSequence1, oSequence2) {
	var oSequence	= new cXPath2Sequence(oSequence1);
	for (var nIndex = 0, nLength = oSequence2.items.length; nIndex < nLength; nIndex++)
		oSequence.add(oSequence2.items[nIndex]);
	return oSequence;
};

// 15.3 Equals, Union, Intersection and Except
// op:union($parameter1 as node()*, $parameter2 as node()*) as node()*
cFunctionCall.operators["union"]	= function(oSequence1, oSequence2) {
	var oSequence	= new cXPath2Sequence(oSequence1);
	for (var nIndex = 0, nLength = oSequence2.items.length; nIndex < nLength; nIndex++)
		if (oSequence.items.indexOf(oSequence2.items[nIndex]) ==-1)
			oSequence.add(oSequence2.items[nIndex]);
	return oSequence;
};

// op:intersect($parameter1 as node()*, $parameter2 as node()*) as node()*
cFunctionCall.operators["intersect"]	= function(oSequence1, oSequence2) {
	var oSequence	= new cXPath2Sequence;
	for (var nIndex = 0, nLength = oSequence1.items.length; nIndex < nLength; nIndex++)
		if (oSequence2.items.indexOf(oSequence1.items[nIndex]) >-1)
			oSequence.add(oSequence1.items[nIndex]);
	return oSequence;
};

// op:except($parameter1 as node()*, $parameter2 as node()*) as node()*
cFunctionCall.operators["except"]	= function(oSequence1, oSequence2) {
	var oSequence	= new cXPath2Sequence;
	for (var nIndex = 0, nLength = oSequence1.items.length; nIndex < nLength; nIndex++)
		if (oSequence2.items.indexOf(oSequence1.items[nIndex]) ==-1)
			oSequence.add(oSequence1.items[nIndex]);
	return oSequence;
};

// 15.5 Functions and Operators that Generate Sequences
// op:to($firstval as xs:integer, $lastval as xs:integer) as xs:integer*
cFunctionCall.operators["to"]	= function(oLeft, oRight) {
	var oSequence	= new cXPath2Sequence;
	for (var nIndex = oLeft, nLength = oRight; nIndex <= nLength; nIndex++)
		oSequence.add(nIndex);
	return oSequence;
};
