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
cAxisStep.parse	= function (oLexer) {
	var sAxis	= oLexer.peek(),
		oStep;
	if (oLexer.peek(1) == "::") {
		if (sAxis in cAxisStep.axises) {
			oLexer.next();
			oLexer.next();
			oStep	= new cAxisStep(sAxis, cNodeTest.parse(oLexer));
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
		oStep	= new cAxisStep("attribute", cNodeTest.parse(oLexer));
	}
	else {
		oStep	= new cAxisStep("child", cNodeTest.parse(oLexer));
	}
	//
	cStepExpr.parsePredicates(oLexer, oStep);

	return oStep;
};

// Public members
cAxisStep.prototype.evaluate	= function (oContext) {
	var oSequence	= new cXPathSequence,
		oItem;
	for (var nIndex = 0, nLength = oContext.sequence.items.length; nIndex < nLength; nIndex++) {
		oItem	= oContext.sequence.items[nIndex];
		switch (this.axis) {
			// Forward axis
			case "attribute":

				break;

			case "child":
				for (var oNode = oItem.firstChild; oNode; oNode = oNode.nextSibling)
					oSequence.add(oNode);
				break;

			case "descendant":

				break;

			case "descendant-or-self":

				break;

			case "following":

				break;

			case "following-sibling":

				break;

			case "self":
				oSequence.add(oItem);
				break;

			// Reverse axis
			case "ancestor":
				for (var oNode = oItem; oNode = oNode.parentNode;)
					oSequence.add(oNode);
				break;

			case "ancestor-or-self":
				for (var oNode = oItem; oNode; oNode = oNode.parentNode)
					oSequence.add(oNode);
				break;

			case "parent":
				if (oItem.parentNode)
					oSequence.add(oItem.parentNode);
				break;

			case "preceding":

				break;

			case "preceding-sibling":

				break;
		}
	}

	// Apply test
	if (this.test && oSequence.items.length) {
		var oInSequence	= oSequence;
		oSequence	= new cXPathSequence;
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
