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

// Static members
cFunctionCall.parse	= function (oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().match(cFunctionCall.RegExp);
	if (aMatch && oLexer.peek(1) == '(') {
		// Reserved "functions"
		if (!aMatch[1] && (aMatch[2] in cKindTest.names))
			return cAxisStep.parse(oLexer, oStaticContext);
		// Other functions
		if (aMatch[1] == '*' || aMatch[2] == '*')
			throw "FunctionCall.parse: illegal use of wildcard in function name";
		var oFunctionCallExpr	= new cFunctionCall(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) || null : oStaticContext.defaultFunctionNamespace),
			oExpr;
		oLexer.next(2);
		//
		if (oLexer.peek() != ')') {
			do {
				if (oLexer.eof() ||!(oExpr = cExprSingle.parse(oLexer, oStaticContext)))
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

	var sUri	= (this.namespaceURI ? '{' + this.namespaceURI + '}' : '') + this.localName;
	// Call function
	if (this.namespaceURI == "http://www.w3.org/2005/xpath-functions") {
		if (fFunction = hXPath2StaticContext_functions[sUri]) {
			// Validate/Cast arguments
			if (aParameters = hXPath2StaticContext_signatures[sUri])
				fFunctionCall_prepare(this.localName, aParameters, fFunction, aArguments, oContext);
			//
			var vResult	= fFunction.apply(oContext, aArguments);
			//
			return vResult === null ? new cXPath2Sequence : new cXPath2Sequence(vResult);
		}
		throw new cXPath2Error("XPST0017"
//->Debug
				, "Unknown system function: " + sUri + '()'
//<-Debug
		);
	}
	else
	if (this.namespaceURI == "http://www.w3.org/2001/XMLSchema") {
		if (fFunction = hXPath2StaticContext_dataTypes[sUri]) {
			//
			fFunctionCall_prepare(this.localName, [[cXSAnyAtomicType]], fFunction, aArguments, oContext);
			//
			return new cXPath2Sequence(fFunction.cast(aArguments[0].items[0]));
		}
		throw new cXPath2Error("XPST0017"
//->Debug
				, "Unknown type constructor function: " + sUri + '()'
//<-Debug
		);
	}
	else
	if (fFunction = oContext.staticContext.getFunction(sUri)) {
		//
		var vResult	= fFunction.apply(oContext, aArguments);
		//
		return vResult === null ? new cXPath2Sequence : new cXPath2Sequence(vResult);
	}
	//
	throw new cXPath2Error("XPST0017"
//->Debug
			, "Unknown user function: " + sUri + '()'
//<-Debug
	);
};

var aFunctionCall_numbers	= ["first", "second", "third", "fourth", "fifth"];
function fFunctionCall_prepare(sName, aParameters, fFunction, aArguments, oContext) {
	var oArgument,
		nArgumentsLength	= aArguments.length,
		oParameter,
		nParametersLength	= aParameters.length,
		nParametersRequired	= 0,
		sCardinality,
		cItemType,
		cDataType;

	// Determine amount of parameters required
	while ((nParametersRequired < aParameters.length) && !aParameters[nParametersRequired][2])
		nParametersRequired++;

	for (var nIndex = 0, nItemsLength; nIndex < nParametersLength; nIndex++) {
		oParameter	= aParameters[nIndex];
		sCardinality= oParameter[1];
		cItemType	= oParameter[0];
		//
		if (nIndex < nArgumentsLength) {
			oArgument	= aArguments[nIndex];
			nItemsLength= oArgument.items.length;
			// Check sequence cardinality
			if (sCardinality == '?') {	// =0 or 1
				if (nItemsLength > 1)
					throw new cXPath2Error("XPTY0004"
//->Debug
							, "Required cardinality of " + aFunctionCall_numbers[nIndex] + " argument of " + sName + "() is one or zero"
//<-Debug
					);
			}
			else
			if (sCardinality == '+') {	// =1+
				if (nItemsLength < 1)
					throw new cXPath2Error("XPTY0004"
//->Debug
							, "Required cardinality of " + aFunctionCall_numbers[nIndex] + " argument of " + sName + "() is one or more"
//<-Debug
					);
			}
			else
			if (sCardinality != '*') {	// =1 ('*' =0+)
				if (nItemsLength != 1)
					throw new cXPath2Error("XPTY0004"
//->Debug
							, "Required cardinality of " + aFunctionCall_numbers[nIndex] + " argument of " + sName + "() is exactly one"
//<-Debug
					);
			}

			// Check sequence items data types consistency
			for (var nItemIndex = 0, nNodeType, vItem; nItemIndex < nItemsLength; nItemIndex++) {
				vItem	= oArgument.items[nItemIndex];
				// Node types
				if (cItemType == cXTNode || cItemType.prototype instanceof cXTNode) {
					// Check if is node
					if (!oContext.DOMAdapter.isNode(vItem))
						throw new cXPath2Error("XPTY0004"
//->Debug
								, "Required item type of " + aFunctionCall_numbers[nIndex] + " argument of " + sName + "() is " + cItemType
//<-Debug
						);

					// Check node type
					if (cItemType != cXTNode) {
						nNodeType	= oContext.DOMAdapter.getProperty(vItem, "nodeType");
						if ([null, cXTElement, cXTAttribute, cXTText, cXTText, null, null, cXTProcessingInstruction, cXTComment, cXTDocument, null, null, null][nNodeType] != cItemType)
							throw new cXPath2Error("XPTY0004"
//->Debug
									, "Required item type of " + aFunctionCall_numbers[nIndex] + " argument of " + sName + "() is " + cItemType
//<-Debug
							);
					}
				}
				else
				// Atomic types
				if (cItemType == cXSAnyAtomicType || cItemType.prototype instanceof cXSAnyAtomicType || cItemType == cXTNumeric) {
					// Atomize item
					vItem	= cXPath2Sequence.atomizeItem(vItem, oContext);
					// Cast if item type is xs:untypedAtomic
					if (cItemType != cXSAnyAtomicType && vItem instanceof cXSUntypedAtomic)
						vItem	=(cItemType != cXTNumeric ? cItemType : cXSDecimal).cast(vItem);
					// Check type
					cDataType	= cXSAnyAtomicType.typeOf(vItem);
					if (cItemType != cXTNumeric ? (cDataType != cItemType && !(cDataType.prototype instanceof cItemType)) : !cXSAnyAtomicType.isNumeric(cDataType))
						throw new cXPath2Error("XPTY0004"
//->Debug
								, "Required item type of " + aFunctionCall_numbers[nIndex] + " argument of " + sName + "() is " + cItemType
//<-Debug
						);
					// Write value back to sequence
					oArgument.items[nItemIndex]	= vItem;
				}
			}
		}
		else
		if (!oParameter[2])
			throw new cXPath2Error("XPST0017"
//->Debug
					, "Function " + sName + "() must have " + (nParametersRequired == nParametersLength ? "exactly" : "at least") + " " + nParametersRequired + " argument" + (nParametersLength > 1 ? 's' : '')
//<-Debug
			);
	}
	// Validate arguments length
	if (nArgumentsLength > nParametersLength)
		throw new cXPath2Error("XPST0017"
//->Debug
				, "Function " + sName + "() must have no more than " + nParametersLength + " argument" + (nParametersLength > 1 ? 's' : '')
//<-Debug
		);
};