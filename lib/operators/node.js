var cXSBoolean = require('./../types/schema/simple/atomic/XSBoolean');

/*
	14 Functions and Operators on Nodes
		op:is-same-node
		op:node-before
		op:node-after
*/

var exports = {};

// 14 Operators on Nodes
// op:is-same-node($parameter1 as node(), $parameter2 as node()) as xs:boolean
exports.isSameNode = function(oLeft, oRight) {
	return new cXSBoolean(this.DOMAdapter.isSameNode(oLeft, oRight));
};

// op:node-before($parameter1 as node(), $parameter2 as node()) as xs:boolean
exports.nodeBefore = function(oLeft, oRight) {
	return new cXSBoolean(!!(this.DOMAdapter.compareDocumentPosition(oLeft, oRight) & 4));
};

// op:node-after($parameter1 as node(), $parameter2 as node()) as xs:boolean
exports.nodeAfter = function(oLeft, oRight) {
	return new cXSBoolean(!!(this.DOMAdapter.compareDocumentPosition(oLeft, oRight) & 2));
};

module.exports = exports;