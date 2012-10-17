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
	var oSequence	= new cXPath2Sequence;
	var oItem	= oContext.context;

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
			var fGetChildrenForward	= function(oNode) {
					for (; oNode; oNode = oNode.nextSibling) {
						oSequence.add(oNode);
						if (oNode.firstChild)
							fGetChildrenForward(oNode.firstChild);
					}
				};
			for (var oParent = oItem; oParent; oParent = oParent.parentNode) {
				if (oParent == oItem)
					if (oParent.firstChild)
						fGetChildrenForward(oParent.firstChild);
				if (oParent.nextSibling)
					fGetChildrenForward(oParent.nextSibling);
			}
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
			var fGetChildrenBackward	= function(oNode) {
				for (; oNode; oNode = oNode.previousSibling) {
					if (oNode.lastChild)
						fGetChildrenBackward(oNode.lastChild);
					oSequence.add(oNode);
				}
			};
			for (var oParent = oItem; oParent; oParent = oParent.parentNode) {
				if (oParent != oItem)
					oSequence.add(oParent);
				if (oParent.previousSibling)
					fGetChildrenBackward(oParent.previousSibling);
			}
			break;

		case "preceding-sibling":
			for (var oNode = oItem.previousSibling; oNode; oNode = oNode.previousSibling)
				oSequence.add(oNode);
			break;
	}

	// Apply test
	if (this.test && oSequence.items.length) {
		var oSequence1	= oSequence;
		oSequence	= new cXPath2Sequence;
		for (var nIndex = 0, nLength = oSequence1.items.length; nIndex < nLength; nIndex++) {
			if (this.test.test(oSequence1.items[nIndex]))
				oSequence.add(oSequence1.items[nIndex]);
		}
	}

	// Apply predicates
	if (this.predicates.length && oSequence.items.length)
		oSequence	= cStepExpr.prototype.applyPredicates.call(this, oContext, oSequence);

	// Reverse results if reverse axis
	switch (this.axis) {
		case "ancestor":
		case "ancestor-or-self":
		case "parent":
		case "preceding":
		case "preceding-sibling":
			oSequence	= cXPath2Sequence.reverse(oSequence);
	}

	return oSequence;
};
