/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cFunctionCall(sPrefix, sLocalName, sNameSpaceURI) {
	this.prefix			= sPrefix;
	this.localName		= sLocalName;
	this.namespaceURI	= sNameSpaceURI;
	this.args	= [];
};

cFunctionCall.RegExp	= /^(?:(?![0-9-])([\w-]+|\*)\:)?(?![0-9-])([\w-]+|\*)$/;

cFunctionCall.prototype.prefix			= null;
cFunctionCall.prototype.localName		= null;
cFunctionCall.prototype.namespaceURI	= null;
cFunctionCall.prototype.args	= null;

cFunctionCall.functions	= {};
cFunctionCall.operators	= {};
cFunctionCall.dataTypes	= {};

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
		var oFunctionCallExpr	= new cFunctionCall(aMatch[1] || null, aMatch[2], aMatch[1] ? oResolver(aMatch[1]) || null : "http://www.w3.org/2005/xpath-functions"),
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
	if (this.namespaceURI == "http://www.w3.org/2005/xpath-functions") {
		if (fFunction = cFunctionCall.functions[this.localName])
			return fFunction.apply(oContext, aArguments);
		throw new cXPath2Error("XPST0017", "Unknown system function " + this.localName + '()');
	}
	if (this.namespaceURI == "http://www.w3.org/2001/XMLSchema") {
		if (fFunction = cFunctionCall.dataTypes[this.localName]) {
			if (aArguments.length == 1) {
				if (aArguments[0].isSingleton())
					return new cXPath2Sequence(fFunction.cast(aArguments[0].items[0]));
				throw new cXPath2Error("XPTY0004", "Required cardinality of value in 'cast as' expression is exactly one; supplied value has cardinality one or more");
			}
			throw new cXPath2Error("XPST0017", "A constructor function must have exactly one argument");
		}
		throw new cXPath2Error("XPST0017", "Unknown constructor function: " + '{' + this.namespaceURI + '}' + this.localName);
	}
	var sUri	= (this.namespaceURI ? this.namespaceURI + '#' : '') + this.localName;
	if (oContext.scope.hasOwnProperty(sUri) && (fFunction = oContext.scope[sUri]) && typeof fFunction == "function")
		return fFunction.apply(oContext, aArguments);
	//
	throw new cXPath2Error("XPST0017", "Unknown user function: " + '{' + this.namespaceURI + '}' + this.localName);
};
