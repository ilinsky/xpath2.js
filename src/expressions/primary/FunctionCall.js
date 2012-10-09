/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cFunctionCall(sPrefix, sLocalName) {
	this.prefix		= sPrefix;
	this.localName	= sLocalName;
	this.args		= [];
};

cFunctionCall.RegExp	= /^(?:(?![0-9-])([\w-]+)\:)?(?![0-9-])([\w-]+)$/;

cFunctionCall.prototype.prefix		= null;
cFunctionCall.prototype.localName	= null;
cFunctionCall.prototype.args		= null;

cFunctionCall.functions	= {};

// http://www.w3.org/2005/xpath-functions

// Static members
cFunctionCall.parse	= function (oLexer, oResolver) {
	var aMatch	= oLexer.peek().match(cFunctionCall.RegExp);
	if (aMatch && oLexer.peek(1) == '(') {
		var oExpr	= new cFunctionCall(aMatch[1] || null, aMatch[2]);
		oLexer.next();
		oLexer.next();
		//
		if (oLexer.eof())
			throw "FunctionCall.parse: expected ')' token";
		//
		if (oLexer.peek() != ')') {
			do {
				oExpr.args.push(cExprSingle.parse(oLexer, oResolver));
			}
			while (oLexer.peek() == ',' && oLexer.next());
			//
			if (oLexer.peek() != ')')
				throw "FunctionCall.parse: Expected ')' token";
		}
		oLexer.next();
		return oExpr;
	}
};

// Public members
cFunctionCall.prototype.evaluate	= function (oContext) {
	var sFunction	= this.localName,
		aArguments	= [],
		fFunction;

	// Evaluate arguments
	for (var nIndex = 0, nLength = this.args.length; nIndex < nLength; nIndex++)
		aArguments.push(this.args[nIndex].evaluate(oContext));

	// Call function
	if (fFunction = cFunctionCall.functions[sFunction])
		return fFunction.apply(oContext, aArguments);
	else
	if ((fFunction = window[sFunction]) && typeof fFunction == "function")
		return fFunction.apply(window, aArguments);
	else
		throw "FunctionCall.prototype.evaluate: Could not find function: " + sFunction;
};
