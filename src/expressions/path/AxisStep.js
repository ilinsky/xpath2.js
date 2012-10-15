/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cAxisStep(sAxis, oTest) {
	this.axis	= sAxis;
	this.test	= oTest;
	this.predicates	= [];
};

//cAxisStep.prototype	= new cStepExpr;

cAxisStep.prototype.axis		= null;
cAxisStep.prototype.test		= null;
cAxisStep.prototype.predicates	= null;

cAxisStep.axises	= {};
// Forward axis
cAxisStep.axises["attribute"]			= [];
cAxisStep.axises["child"]				= [];
cAxisStep.axises["descendant"]			= [];
cAxisStep.axises["descendant-or-self"]	= [];
cAxisStep.axises["following"]			= [];
cAxisStep.axises["following-sibling"]	= [];
cAxisStep.axises["self"]				= [];
// cAxisStep.axises["namespace"]			= [];	// deprecated in 2.0
// Reverse axis
cAxisStep.axises["ancestor"]			= [];
cAxisStep.axises["ancestor-or-self"]	= [];
cAxisStep.axises["parent"]				= [];
cAxisStep.axises["preceding"]			= [];
cAxisStep.axises["preceding-sibling"]	= [];

// Static members
cAxisStep.parse	= function (oLexer, oResolver) {
	var sAxis	= oLexer.peek(),
		oExpr,
		oStep;
	if (oLexer.peek(1) == "::") {
		if (sAxis in cAxisStep.axises) {
			oLexer.next(2);
			if (oLexer.eof() ||!(oExpr = cNodeTest.parse(oLexer, oResolver)))
				throw "AxisStep.parse: expected NodeTest expression";
			oStep	= new cAxisStep(sAxis, oExpr);
		}
		else
			throw "AxisStep.parse: Unknown axis";
	}
	else
	if (sAxis == "..") {
		oLexer.next();
		oStep	= new cAxisStep("parent", new cKindTest("node"));
	}
	else
	if (sAxis == "@") {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = cNodeTest.parse(oLexer, oResolver)))
			throw "AxisStep.parse: expected NodeTest expression";
		oStep	= new cAxisStep("attribute", oExpr);
	}
	else {
		if (oLexer.eof() ||!(oExpr = cNodeTest.parse(oLexer, oResolver)))
			return;
		oStep	= new cAxisStep("child", oExpr);
	}
	//
	cStepExpr.parsePredicates(oLexer, oResolver, oStep);

	return oStep;
};

// Public members
cAxisStep.prototype.evaluate	= function (oContext) {
	var oSequence	= new cXPath2Sequence,
		oItem;
	for (var nIndex = 0, nLength = oContext.sequence.items.length; nIndex < nLength; nIndex++) {
		oItem	= oContext.sequence.items[nIndex];
		switch (this.axis) {
			// Forward axis
			case "attribute":
				for (var nIndex = 0, nLength = oItem.attributes.length; nIndex < nLength; nIndex++)
					oSequence.add(oItem.attributes[nIndex]);
				break;

			case "child":
				for (var oNode = oItem.firstChild; oNode; oNode = oNode.nextSibling)
					oSequence.add(oNode);
				break;

			case "descendant-or-self":
				oSequence.add(oItem);
				// No break left intentionally
			case "descendant":
				(function(oItem) {
					for (var oNode = oItem.firstChild; oNode; oNode = oNode.nextSibling) {
						oSequence.add(oNode);
						if (oNode.firstChild)
							arguments.callee(oNode);
					}
				})(oItem);
				break;

			case "following":
				throw "Not implemented";
				break;

			case "following-sibling":
				for (var oNode = oItem.nextSibling; oNode; oNode = oNode.nextSibling)
					oSequence.add(oNode);
				break;

			case "self":
				oSequence.add(oItem);
				break;

			// Reverse axis
			case "ancestor-or-self":
				oSequence.add(oItem);
				// No break left intentionally
			case "ancestor":
				for (var oNode = oItem; oNode = oNode.parentNode;)
					oSequence.add(oNode);
				break;

			case "parent":
				if (oItem.parentNode)
					oSequence.add(oItem.parentNode);
				break;

			case "preceding":
				throw "Not implemented";
				break;

			case "preceding-sibling":
				for (var oNode = oItem.previousSibling; oNode; oNode = oNode.previousSibling)
					oSequence.add(oNode);
				break;
		}
	}

	// Apply test
	if (this.test && oSequence.items.length) {
		var oInSequence	= oSequence;
		oSequence	= new cXPath2Sequence;
		for (var nIndex = 0, nLength = oInSequence.items.length; nIndex < nLength; nIndex++) {
			if (this.test.test(oInSequence.items[nIndex]))
				oSequence.add(oInSequence.items[nIndex]);
		}
	}

	// Apply predicates
	if (this.predicates.length && oSequence.items.length) {
		oContext.sequence	= oSequence;
		oContext.position	= 1;
		oSequence	= cStepExpr.prototype.applyPredicates.call(this, oContext);
	}

	return oSequence;
};
