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

cFunctionCall.QNAME	= /^(?:([\w-]+):)?([\w-]+)$/i;

cFunctionCall.prototype.prefix		= null;
cFunctionCall.prototype.localName	= null;
cFunctionCall.prototype.args		= null;

cFunctionCall.functions	= {};

// http://www.w3.org/2005/xpath-functions

// Static members
cFunctionCall.parse	= function (oLexer) {
	if (oLexer.peek().match(cFunctionCall.QNAME) && oLexer.peek(1) == '(') {
		var oExpr	= new cFunctionCall(cRegExp.$1 || null, cRegExp.$2);
		oLexer.next();
		oLexer.next();
		//
		if (oLexer.eof())
			throw "FunctionCall.parse: expected ')' token";
		//
		if (oLexer.peek() != ')') {
			do {
				oExpr.args.push(cExprSingle.parse(oLexer));
			}
			while (oLexer.peek() == ',' && oLexer.next());
			//
			if (oLexer.peek() != ')')
				throw "FunctionCall.parse error: missing required ')' token";
		}
		oLexer.next();
		return oExpr;
	}
	else
		throw "Not FunctionCall";
};

// Public members
cFunctionCall.prototype.evaluate	= function (oContext) {
	var sFunction	= this.prefix == null ? this.localName : this.$root.$resolver(this.prefix) + '#' + this.localName,
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
		return fFunction.apply(oContext, aArguments);
	else
		throw "Could not find function: " + sFunction;
};
