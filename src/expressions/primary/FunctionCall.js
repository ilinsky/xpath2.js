/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cFunctionCall(sUri) {
	this.uri	= sUri;
	this.args	= [];
};

cFunctionCall.RegExp	= /^(?:(?![0-9-])([\w-]+|\*)\:)?(?![0-9-])([\w-]+|\*)$/;

cFunctionCall.prototype.uri		= null;
cFunctionCall.prototype.args	= null;

cFunctionCall.functions	= {};
cFunctionCall.operators	= {};

// http://www.w3.org/2005/xpath-functions

// Static members
cFunctionCall.parse	= function (oLexer, oResolver) {
	var aMatch	= oLexer.peek().match(cFunctionCall.RegExp);
	if (aMatch && oLexer.peek(1) == '(') {
		// Reserved "functions"
		if (!aMatch[1] && (aMatch[2] in cKindTest.names))
			return cAxisStep.parse(oLexer);
		// Other functions
		if (aMatch[1] == '*' || aMatch[2] == '*')
			throw "FunctionCall.parse: illegal use of wildcard in function name";
		var oFunctionCallExpr	= new cFunctionCall((aMatch[1] && aMatch[1] != 'fn' ? oResolver(aMatch[1]) + '#' : '') + aMatch[2]),
			oExpr;
		oLexer.next(2);
		//
		if (oLexer.peek() != ')') {
			do {
				if (oLexer.eof() ||!(oExpr = cExprSingle.parse(oLexer, oResolver)))
					throw "FunctionCall.parse: expected ExprSingle expression";
				oFunctionCallExpr.args.push(oExpr);
			}
			while (oLexer.peek() == ',' && oLexer.next());
			//
			if (oLexer.peek() != ')')
				throw "FunctionCall.parse: Expected ')' token";
		}
		oLexer.next();
		return oFunctionCallExpr;
	}
};

// Public members
cFunctionCall.prototype.evaluate	= function (oContext) {
	var aArguments	= [],
		fFunction;

	// Evaluate arguments
	for (var nIndex = 0, nLength = this.args.length; nIndex < nLength; nIndex++)
		aArguments.push(this.args[nIndex].evaluate(oContext));

	// Call function
	if (fFunction = cFunctionCall.functions[this.uri])
		return fFunction.apply(oContext, aArguments);
	else
	if ((fFunction = oContext.scope[this.uri]) && typeof fFunction == "function")
		return fFunction.apply(oContext, aArguments);
	else
		throw "FunctionCall.prototype.evaluate: Could not find function: " + this.uri;
};
