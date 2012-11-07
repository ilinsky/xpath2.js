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
		aParameters,
		fFunction;

	// Evaluate arguments
	for (var nIndex = 0, nLength = this.args.length; nIndex < nLength; nIndex++)
		aArguments.push(this.args[nIndex].evaluate(oContext));

	// Call function
	if (this.namespaceURI == "http://www.w3.org/2005/xpath-functions") {
		if (fFunction = cFunctionCall.functions[this.localName]) {
			// Validate/Cast arguments
			if (aParameters = fFunction.parameters)
				fFunctionCall_prepare(this.localName, aParameters, fFunction, aArguments);

			return fFunction.apply(oContext, aArguments);
		}
		throw new cXPath2Error("XPST0017", "Unknown system function " + this.localName + '()');
	}
	if (this.namespaceURI == "http://www.w3.org/2001/XMLSchema") {
		if (fFunction = cFunctionCall.dataTypes[this.localName]) {
			//
			fFunctionCall_prepare(this.localName, [[cXSAnyAtomicType]], fFunction, aArguments);
			//
			return new cXPath2Sequence(fFunction.cast(aArguments[0].items[0]));
		}
		throw new cXPath2Error("XPST0017", "Unknown constructor function: " + '{' + this.namespaceURI + '}' + this.localName);
	}
	var sUri	= (this.namespaceURI ? this.namespaceURI + '#' : '') + this.localName;
	if (oContext.scope.hasOwnProperty(sUri) && (fFunction = oContext.scope[sUri]) && typeof fFunction == "function")
		return fFunction.apply(oContext, aArguments);
	//
	throw new cXPath2Error("XPST0017", "Unknown user function: " + '{' + this.namespaceURI + '}' + this.localName);
};

var aFunctionCall_numbers	= ["first", "second", "third", "fourth", "fifth"];
function fFunctionCall_prepare(sName, aParameters, fFunction, aArguments) {
	var oArgument,
		nArgumentsLength	= aArguments.length,
		oParameter,
		nParametersLength	= aParameters.length,
		nParametersRequired	= 0,
		sCardinality,
		cDataType,
		cItemType;

	// Determine amount of parameters required
	while ((nParametersRequired < aParameters.length) && !aParameters[nParametersRequired][2])
		nParametersRequired++;

	for (var nIndex = 0, nItemsLength; nIndex < nParametersLength; nIndex++) {
		oParameter	= aParameters[nIndex];
		sCardinality= oParameter[1];
		cDataType	= oParameter[0];
		//
		if (nIndex < nArgumentsLength) {
			oArgument	= aArguments[nIndex];
			nItemsLength= oArgument.items.length;
			// Check sequence cardinality
			if (sCardinality == '?') {	// =0 or 1
				if (nItemsLength > 1)
					throw new cXPath2Error("XPTY0004", "Required cardinality of " + aFunctionCall_numbers[nIndex] + " argument in function " + sName + "() is one or zero");
			}
			else
			if (sCardinality == '+') {	// =1+
				if (nItemsLength < 1)
					throw new cXPath2Error("XPTY0004", "Required cardinality of " + aFunctionCall_numbers[nIndex] + " argument in function " + sName + "() is one or more");
			}
			else
			if (sCardinality != '*') {	// =1 ('*' =0+)
				if (nItemsLength != 1)
					throw new cXPath2Error("XPTY0004", "Required cardinality of " + aFunctionCall_numbers[nIndex] + " argument in " + sName + "() is exactly one");
			}

			// Check sequence items data types consistency
			for (var nItemIndex = 0, nNodeType, vItem; nItemIndex < nItemsLength; nItemIndex++) {
				vItem	= oArgument.items[nItemIndex];
				// Node types
				if (cDataType == cXTNode || cDataType.prototype instanceof cXTNode) {
					// Check if is node
					if (!cXPath2.DOMAdapter.isNode(vItem))
						throw new cXPath2Error("XPTY0004", "Required item type of " + aFunctionCall_numbers[nIndex] + " argument of " + sName + "() is " + cDataType);

					// Check node type
					if (cDataType != cXTNode) {
						nNodeType	= cXPath2.DOMAdapter.getProperty(vItem, "nodeType");
						if ([cXTElement, cXTAttribute, cXTText, cXTText, null, null, cXTProcessingInstruction, cXTComment, cXSDocument, null, null, null][nNodeType] != cDataType)
							throw new cXPath2Error("XPTY0004", "Required item type of " + aFunctionCall_numbers[nIndex] + " argument of " + sName + "() is " + cDataType);
					}
				}
				else
				// Atomic types
				if (cDataType == cXSAnyAtomicType || cDataType.prototype instanceof cXSAnyAtomicType) {
					// Atomize item
					vItem	= cXPath2Sequence.atomizeItem(vItem);
					// Cast if item type is xs:untypedAtomic
					if (cDataType != cXSAnyAtomicType && vItem instanceof cXSUntypedAtomic)
						vItem	= cDataType.cast(vItem);
					// Check type
					cItemType	= cXSAnyAtomicType.typeOf(vItem);
					if (cItemType != cDataType && !(cItemType.prototype instanceof cDataType))
						throw new cXPath2Error("XPTY0004", "Required item type of " + aFunctionCall_numbers[nIndex] + " argument of " + sName + "() is " + cDataType);
					// Write value back to sequence
					oArgument.items[nItemIndex]	= vItem;
				}
			}
		}
		else
		if (!oParameter[2])
			throw new cXPath2Error("XPST0017", "Function " + sName + "() must have " + (nParametersRequired == nParametersLength ? "exactly" : "at least") + " " + nParametersRequired + " argument" + (nParametersLength > 1 ? 's' : ''));
	}
	// Validate arguments length
	if (nArgumentsLength > nParametersLength)
		throw new cXPath2Error("XPST0017", "Function " + sName + "() must have no more than " + nParametersLength + " argument" + (nParametersLength > 1 ? 's' : ''));
};

//
// throw new cXPath2Error("XPST0017", "A constructor function must have exactly one argument");

function fFunctionCall_defineSystemFunction(sName, aParameters, fFunction) {
	(cFunctionCall.functions[sName]	= fFunction).parameters	= aParameters;
};