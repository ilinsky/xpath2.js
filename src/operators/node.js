/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cXSBoolean = require('./../types/schema/simple/atomic/XSBoolean');

/*
	14 Functions and Operators on Nodes
		op:is-same-node
		op:node-before
		op:node-after
*/

// 14 Operators on Nodes
// op:is-same-node($parameter1 as node(), $parameter2 as node()) as xs:boolean
function fIsSameNode(oLeft, oRight) {
	return new cXSBoolean(this.DOMAdapter.isSameNode(oLeft, oRight));
};

// op:node-before($parameter1 as node(), $parameter2 as node()) as xs:boolean
function fNodeBefore(oLeft, oRight) {
	return new cXSBoolean(!!(this.DOMAdapter.compareDocumentPosition(oLeft, oRight) & 4));
};

// op:node-after($parameter1 as node(), $parameter2 as node()) as xs:boolean
function fNodeAfter(oLeft, oRight) {
	return new cXSBoolean(!!(this.DOMAdapter.compareDocumentPosition(oLeft, oRight) & 2));
};

module.exports = {
    fIsSameNode: fIsSameNode,
    fNodeBefore: fNodeBefore,
    fNodeAfter: fNodeAfter
};