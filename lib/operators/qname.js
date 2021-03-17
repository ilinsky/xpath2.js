var cXSBoolean = require('./../types/schema/simple/atomic/XSBoolean');

/*
	11.2 Functions and Operators Related to QNames
		op:QName-equal
*/

// 11.2 Operators Related to QNames
// op:QName-equal($arg1 as xs:QName, $arg2 as xs:QName) as xs:boolean
function fQNameEqual(oLeft, oRight) {
	return new cXSBoolean(oLeft.localName == oRight.localName && oLeft.namespaceURI == oRight.namespaceURI);
};

module.exports = {
    fQNameEqual: fQNameEqual
};