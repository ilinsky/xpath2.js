/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
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

cAxisStep.prototype	= new cStepExpr;

cAxisStep.prototype.axis		= null;
cAxisStep.prototype.test		= null;

//
var hAxisStep_axises	= {};
// Forward axis
hAxisStep_axises["attribute"]			= {};
hAxisStep_axises["child"]				= {};
hAxisStep_axises["descendant"]			= {};
hAxisStep_axises["descendant-or-self"]	= {};
hAxisStep_axises["following"]			= {};
hAxisStep_axises["following-sibling"]	= {};
hAxisStep_axises["self"]				= {};
// hAxisStep_axises["namespace"]			= {};	// deprecated in 2.0
// Reverse axis
hAxisStep_axises["ancestor"]			= {};
hAxisStep_axises["ancestor-or-self"]	= {};
hAxisStep_axises["parent"]				= {};
hAxisStep_axises["preceding"]			= {};
hAxisStep_axises["preceding-sibling"]	= {};

// Static members
function fAxisStep_parse (oLexer, oStaticContext) {
	var sAxis	= oLexer.peek(),
		oExpr,
		oStep;
	if (oLexer.peek(1) == '::') {
		if (!(sAxis in hAxisStep_axises))
			throw new cException("XPST0003"
//->Debug
					, "Unknown axis name: " + sAxis
//<-Debug
			);

		oLexer.next(2);
		if (oLexer.eof() ||!(oExpr = fNodeTest_parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected node test expression in axis step"
//<-Debug
			);
		//
		oStep	= new cAxisStep(sAxis, oExpr);
	}
	else
	if (sAxis == '..') {
		oLexer.next();
		oStep	= new cAxisStep("parent", new cKindTest("node"));
	}
	else
	if (sAxis == '@') {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fNodeTest_parse(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected node test expression in axis step"
//<-Debug
			);
		//
		oStep	= new cAxisStep("attribute", oExpr);
	}
	else {
		if (oLexer.eof() ||!(oExpr = fNodeTest_parse(oLexer, oStaticContext)))
			return;
		oStep	= new cAxisStep(oExpr instanceof cKindTest && oExpr.name == "attribute" ? "attribute" : "child", oExpr);
	}
	//
	fStepExpr_parsePredicates(oLexer, oStaticContext, oStep);

	return oStep;
};

// Public members
cAxisStep.prototype.evaluate	= function (oContext) {
	var oItem	= oContext.item;

	if (!oContext.DOMAdapter.isNode(oItem))
		throw new cException("XPTY0020");

	var oSequence	= [],
		fGetProperty= oContext.DOMAdapter.getProperty,
		nType		= fGetProperty(oItem, "nodeType");

	switch (this.axis) {
		// Forward axis
		case "attribute":
			if (nType == 1)
				for (var aAttributes = fGetProperty(oItem, "attributes"), nIndex = 0, nLength = aAttributes.length; nIndex < nLength; nIndex++)
					oSequence.push(aAttributes[nIndex]);
			break;

		case "child":
			for (var oNode = fGetProperty(oItem, "firstChild"); oNode; oNode = fGetProperty(oNode, "nextSibling"))
				oSequence.push(oNode);
			break;

		case "descendant-or-self":
			oSequence.push(oItem);
			// No break left intentionally
		case "descendant":
			fAxisStep_getChildrenForward(fGetProperty(oItem, "firstChild"), oSequence, fGetProperty);
			break;

		case "following":
			// TODO: Attribute node context
			for (var oParent = oItem, oSibling; oParent; oParent = fGetProperty(oParent, "parentNode"))
				if (oSibling = fGetProperty(oParent, "nextSibling"))
					fAxisStep_getChildrenForward(oSibling, oSequence, fGetProperty);
			break;

		case "following-sibling":
			for (var oNode = oItem; oNode = fGetProperty(oNode, "nextSibling");)
				oSequence.push(oNode);
			break;

		case "self":
			oSequence.push(oItem);
			break;

		// Reverse axis
		case "ancestor-or-self":
			oSequence.push(oItem);
			// No break left intentionally
		case "ancestor":
			for (var oNode = nType == 2 ? fGetProperty(oItem, "ownerElement") : oItem; oNode = fGetProperty(oNode, "parentNode");)
				oSequence.push(oNode);
			break;

		case "parent":
			var oParent	= nType == 2 ? fGetProperty(oItem, "ownerElement") : fGetProperty(oItem, "parentNode");
			if (oParent)
				oSequence.push(oParent);
			break;

		case "preceding":
			// TODO: Attribute node context
			for (var oParent = oItem, oSibling; oParent; oParent = fGetProperty(oParent, "parentNode"))
				if (oSibling = fGetProperty(oParent, "previousSibling"))
					fAxisStep_getChildrenBackward(oSibling, oSequence, fGetProperty);
			break;

		case "preceding-sibling":
			for (var oNode = oItem; oNode = fGetProperty(oNode, "previousSibling");)
				oSequence.push(oNode);
			break;
	}

	// Apply test
	if (oSequence.length && !(this.test instanceof cKindTest && this.test.name == "node")) {
		var oSequence1	= oSequence;
		oSequence	= [];
		for (var nIndex = 0, nLength = oSequence1.length; nIndex < nLength; nIndex++) {
			if (this.test.test(oSequence1[nIndex], oContext))
				oSequence.push(oSequence1[nIndex]);
		}
	}

	// Apply predicates
	if (oSequence.length && this.predicates.length)
		oSequence	= this.applyPredicates(oSequence, oContext);

	// Reverse results if reverse axis
	switch (this.axis) {
		case "ancestor":
		case "ancestor-or-self":
		case "parent":
		case "preceding":
		case "preceding-sibling":
			oSequence.reverse();
	}

	return oSequence;
};

//
function fAxisStep_getChildrenForward(oNode, oSequence, fGetProperty) {
	for (var oChild; oNode; oNode = fGetProperty(oNode, "nextSibling")) {
		oSequence.push(oNode);
		if (oChild = fGetProperty(oNode, "firstChild"))
			fAxisStep_getChildrenForward(oChild, oSequence, fGetProperty);
	}
};

function fAxisStep_getChildrenBackward(oNode, oSequence, fGetProperty) {
	for (var oChild; oNode; oNode = fGetProperty(oNode, "previousSibling")) {
		if (oChild = fGetProperty(oNode, "lastChild"))
			fAxisStep_getChildrenBackward(oChild, oSequence, fGetProperty);
		oSequence.push(oNode);
	}
};