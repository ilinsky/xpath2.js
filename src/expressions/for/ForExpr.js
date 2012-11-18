/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cForExpr() {
	this.bindings	= [];
	this.returnExpr	= null;
};

cForExpr.prototype.bindings		= null;
cForExpr.prototype.returnExpr	= null;

// Static members
cForExpr.parse	= function (oLexer, oStaticContext) {
	if (oLexer.peek() == "for" && oLexer.peek(1).substr(0, 1) == '$') {
		oLexer.next();

		var oForExpr	= new cForExpr,
			oExpr;
		do {
			oForExpr.bindings.push(cSimpleForBinding.parse(oLexer, oStaticContext));
		}
		while (oLexer.peek() == ',' && oLexer.next());

		if (oLexer.peek() != "return")
			throw new cXPath2Error("XPST0003"
//->Debug
					, "Expected 'return' token in for expression"
//<-Debug
			);

		oLexer.next();
		if (oLexer.eof() ||!(oExpr = cExprSingle.parse(oLexer, oStaticContext)))
			throw new cXPath2Error("XPST0003"
//->Debug
					, "Expected return statement operand in for expression"
//<-Debug
			);

		oForExpr.returnExpr	= oExpr;
		return oForExpr;
	}
};

// Public members
// for $x in X, $y in Y, $z in Z return $x + $y + $z
// for $x in X return for $y in Y return for $z in Z return $x + $y + $z
cForExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= new cXPath2Sequence;
	(function(oSelf, nBinding) {
		var oBinding	= oSelf.bindings[nBinding++],
			oSequence1	= oBinding.inExpr.evaluate(oContext),
			sUri	= (oBinding.namespaceURI ? '{' + oBinding.namespaceURI + '}' : '') + oBinding.localName;
		for (var nIndex = 0, nLength = oSequence1.items.length; nIndex < nLength; nIndex++) {
			oContext.pushVariable(sUri, oSequence1.items[nIndex]);
			if (nBinding < oSelf.bindings.length)
				arguments.callee(oSelf, nBinding);
			else
				oSequence.add(oSelf.returnExpr.evaluate(oContext));
			oContext.popVariable(sUri);
		}
	})(this, 0);

	return oSequence;
};

//
function cSimpleForBinding(sPrefix, sLocalName, sNameSpaceURI, oInExpr) {
	this.prefix			= sPrefix;
	this.localName		= sLocalName;
	this.namespaceURI	= sNameSpaceURI;
	this.inExpr		= oInExpr;
};

cSimpleForBinding.prototype.prefix			= null;
cSimpleForBinding.prototype.localName		= null;
cSimpleForBinding.prototype.namespaceURI	= null;
cSimpleForBinding.prototype.inExpr		= null;

cSimpleForBinding.RegExp	= /^\$(?:(?![0-9-])([\w-]+|\*)\:)?(?![0-9-])([\w-]+|\*)$/;

cSimpleForBinding.parse	= function(oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().match(cSimpleForBinding.RegExp);
	if (!aMatch)
		throw new cXPath2Error("XPST0003"
//->Debug
				, "Expected variable declaration in for expression binding"
//<-Debug
		);

	if (aMatch[1] == '*' || aMatch[2] == '*')
		throw new cXPath2Error("XPST0003"
//->Debug
				, "Illegal use of wildcard in for expression binding variable name"
//<-Debug
		);

	oLexer.next();
	if (oLexer.peek() != "in")
		throw new cXPath2Error("XPST0003"
//->Debug
				, "Expected 'in' token in for expression binding"
//<-Debug
		);

	oLexer.next();
	var oExpr;
	if (oLexer.eof() ||!(oExpr = cExprSingle.parse(oLexer, oStaticContext)))
		throw new cXPath2Error("XPST0003"
//->Debug
				, "Expected in statement operand in for expression binding"
//<-Debug
		);

	return new cSimpleForBinding(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) : null, oExpr);
};