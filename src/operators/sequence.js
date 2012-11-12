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
		oSequence.add(oSequence2);
	return oSequence;
};

// 15.3 Equals, Union, Intersection and Except
// op:union($parameter1 as node()*, $parameter2 as node()*) as node()*
cFunctionCall.operators["union"]	= function(oSequence1, oSequence2) {
	var oSequence	= new cXPath2Sequence;
	// Process first collection
	for (var nIndex = 0, nLength = oSequence1.items.length, oItem; nIndex < nLength; nIndex++) {
		if (!this.staticContext.DOMAdapter.isNode(oItem = oSequence1.items[nIndex]))
			throw new cXPath2Error("XPTY0004"
//->Debug
					, "Required item type of first operand of 'union' is node()"
//<-Debug
			);	// Required item type of second operand of 'intersect' is node(); supplied value has item type xs:integer
		//
		if (oSequence.indexOf(oItem) ==-1)
			oSequence.add(oItem);
	}
	// Process second collection
	for (var nIndex = 0, nLength = oSequence2.items.length, oItem; nIndex < nLength; nIndex++) {
		if (!this.staticContext.DOMAdapter.isNode(oItem = oSequence2.items[nIndex]))
			throw new cXPath2Error("XPTY0004"
//->Debug
					, "Required item type of second operand of 'union' is node()"
//<-Debug
			);	// Required item type of second operand of 'intersect' is node(); supplied value has item type xs:integer
		//
		if (oSequence.indexOf(oItem) ==-1)
			oSequence.add(oItem);
	}
	return cXPath2Sequence.order(oSequence, this);
};

// op:intersect($parameter1 as node()*, $parameter2 as node()*) as node()*
cFunctionCall.operators["intersect"]	= function(oSequence1, oSequence2) {
	var oSequence	= new cXPath2Sequence;
	for (var nIndex = 0, nLength = oSequence1.items.length, oItem, bFound; nIndex < nLength; nIndex++) {
		if (!this.staticContext.DOMAdapter.isNode(oItem = oSequence1.items[nIndex]))
			throw new cXPath2Error("XPTY0004"
//->Debug
					, "Required item type of second operand of 'intersect' is node()"
//<-Debug
			);	// Required item type of second operand of 'intersect' is node(); supplied value has item type xs:integer
		//
		bFound	= false;
		for (var nRightIndex = 0, nRightLength = oSequence2.items.length;(nRightIndex < nRightLength) && !bFound; nRightIndex++) {
			if (!this.staticContext.DOMAdapter.isNode(oSequence2.items[nRightIndex]))
				throw new cXPath2Error("XPTY0004"
//->Debug
						, "Required item type of first operand of 'intersect' is node()"
//<-Debug
				);
			bFound = this.staticContext.DOMAdapter.isSameNode(oSequence2.items[nRightIndex], oItem);
		}
		//
		if (bFound && oSequence.indexOf(oItem) ==-1)
			oSequence.add(oItem);
	}
	return cXPath2Sequence.order(oSequence, this);
};

// op:except($parameter1 as node()*, $parameter2 as node()*) as node()*
cFunctionCall.operators["except"]	= function(oSequence1, oSequence2) {
	var oSequence	= new cXPath2Sequence;
	for (var nIndex = 0, nLength = oSequence1.items.length, oItem, bFound; nIndex < nLength; nIndex++) {
		if (!this.staticContext.DOMAdapter.isNode(oItem = oSequence1.items[nIndex]))
			throw new cXPath2Error("XPTY0004"
//->Debug
					, "Required item type of second operand of 'except' is node()"
//<-Debug
			);	// Required item type of second operand of 'intersect' is node(); supplied value has item type xs:integer
		//
		bFound	= false;
		for (var nRightIndex = 0, nRightLength = oSequence2.items.length;(nRightIndex < nRightLength) && !bFound; nRightIndex++) {
			if (!this.staticContext.DOMAdapter.isNode(oSequence2.items[nRightIndex]))
				throw new cXPath2Error("XPTY0004"
//->Debug
						, "Required item type of first operand of 'except' is node()"
//<-Debug
				);
			bFound = this.staticContext.DOMAdapter.isSameNode(oSequence2.items[nRightIndex], oItem);
		}
		//
		if (!bFound && oSequence.indexOf(oItem) ==-1)
			oSequence.add(oItem);
	}
	return cXPath2Sequence.order(oSequence, this);
};

// 15.5 Functions and Operators that Generate Sequences
// op:to($firstval as xs:integer, $lastval as xs:integer) as xs:integer*
cFunctionCall.operators["to"]	= function(oLeft, oRight) {
	var oSequence	= new cXPath2Sequence;
	for (var nIndex = oLeft, nLength = oRight; nIndex <= nLength; nIndex++)
		oSequence.add(nIndex);
	return oSequence;
};
