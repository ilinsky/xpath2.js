var cException = require('./../classes/Exception');
var cSequence = require('./../classes/Sequence');

var cXSInteger = require('./../types/schema/simple/atomic/integer/XSInteger');

var fArray_indexOf = function(aValue, oSubject) {
    return aValue.indexOf(oSubject);
};

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

var exports = {};

// 15.1 General Functions and Operators on Sequences
// op:concatenate($seq1 as item()*, $seq2 as item()*) as item()*
exports.concatenate = function(oSequence1, oSequence2) {
	return oSequence1.concat(oSequence2);
};

// 15.3 Equals, Union, Intersection and Except
// op:union($parameter1 as node()*, $parameter2 as node()*) as node()*
exports.union = function(oSequence1, oSequence2) {
	var oSequence	= [];
	// Process first collection
	for (var nIndex = 0, nLength = oSequence1.length, oItem; nIndex < nLength; nIndex++) {
		if (!this.DOMAdapter.isNode(oItem = oSequence1[nIndex]))
			throw new cException("XPTY0004"
//->Debug
					, "Required item type of first operand of 'union' is node()"
//<-Debug
			);	// Required item type of second operand of 'intersect' is node(); supplied value has item type xs:integer
		//
		if (fArray_indexOf(oSequence, oItem) ==-1)
			oSequence.push(oItem);
	}
	// Process second collection
	for (var nIndex = 0, nLength = oSequence2.length, oItem; nIndex < nLength; nIndex++) {
		if (!this.DOMAdapter.isNode(oItem = oSequence2[nIndex]))
			throw new cException("XPTY0004"
//->Debug
					, "Required item type of second operand of 'union' is node()"
//<-Debug
			);	// Required item type of second operand of 'intersect' is node(); supplied value has item type xs:integer
		//
		if (fArray_indexOf(oSequence, oItem) ==-1)
			oSequence.push(oItem);
	}
	return cSequence.order(oSequence, this);
};

// op:intersect($parameter1 as node()*, $parameter2 as node()*) as node()*
exports.intersect = function(oSequence1, oSequence2) {
	var oSequence	= [];
	for (var nIndex = 0, nLength = oSequence1.length, oItem, bFound; nIndex < nLength; nIndex++) {
		if (!this.DOMAdapter.isNode(oItem = oSequence1[nIndex]))
			throw new cException("XPTY0004"
//->Debug
					, "Required item type of second operand of 'intersect' is node()"
//<-Debug
			);	// Required item type of second operand of 'intersect' is node(); supplied value has item type xs:integer
		//
		bFound	= false;
		for (var nRightIndex = 0, nRightLength = oSequence2.length;(nRightIndex < nRightLength) && !bFound; nRightIndex++) {
			if (!this.DOMAdapter.isNode(oSequence2[nRightIndex]))
				throw new cException("XPTY0004"
//->Debug
						, "Required item type of first operand of 'intersect' is node()"
//<-Debug
				);
			bFound = this.DOMAdapter.isSameNode(oSequence2[nRightIndex], oItem);
		}
		//
		if (bFound && fArray_indexOf(oSequence, oItem) ==-1)
			oSequence.push(oItem);
	}
	return cSequence.order(oSequence, this);
};

// op:except($parameter1 as node()*, $parameter2 as node()*) as node()*
exports.except = function(oSequence1, oSequence2) {
	var oSequence	= [];
	for (var nIndex = 0, nLength = oSequence1.length, oItem, bFound; nIndex < nLength; nIndex++) {
		if (!this.DOMAdapter.isNode(oItem = oSequence1[nIndex]))
			throw new cException("XPTY0004"
//->Debug
					, "Required item type of second operand of 'except' is node()"
//<-Debug
			);	// Required item type of second operand of 'intersect' is node(); supplied value has item type xs:integer
		//
		bFound	= false;
		for (var nRightIndex = 0, nRightLength = oSequence2.length;(nRightIndex < nRightLength) && !bFound; nRightIndex++) {
			if (!this.DOMAdapter.isNode(oSequence2[nRightIndex]))
				throw new cException("XPTY0004"
//->Debug
						, "Required item type of first operand of 'except' is node()"
//<-Debug
				);
			bFound = this.DOMAdapter.isSameNode(oSequence2[nRightIndex], oItem);
		}
		//
		if (!bFound && fArray_indexOf(oSequence, oItem) ==-1)
			oSequence.push(oItem);
	}
	return cSequence.order(oSequence, this);
};

// 15.5 Functions and Operators that Generate Sequences
// op:to($firstval as xs:integer, $lastval as xs:integer) as xs:integer*
exports.to = function(oLeft, oRight) {
	var oSequence	= [];
	for (var nIndex = oLeft.valueOf(), nLength = oRight.valueOf(); nIndex <= nLength; nIndex++)
		oSequence.push(new cXSInteger(nIndex));
	//
	return oSequence;
};

module.exports = exports;