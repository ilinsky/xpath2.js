/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cException = require('./../../classes/Exception');
var cStaticContext = require('./../../classes/StaticContext');

var cArray = Array;

var sNS_XPF = require('./../../namespaces').NS_XPF;
var sNS_XSD = require('./../../namespaces').NS_XSD;

function cFunctionCall(sPrefix, sLocalName, sNameSpaceURI) {
	this.prefix			= sPrefix;
	this.localName		= sLocalName;
	this.namespaceURI	= sNameSpaceURI;
	this.args	= [];
};

cFunctionCall.prototype.prefix			= null;
cFunctionCall.prototype.localName		= null;
cFunctionCall.prototype.namespaceURI	= null;
cFunctionCall.prototype.args	= null;

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
	if (this.namespaceURI == sNS_XPF) {
		if (fFunction = cStaticContext.functions[this.localName]) {
			// Validate/Cast arguments
			if (aParameters = cStaticContext.signatures[this.localName])
				fFunctionCall_prepare(this.localName, aParameters, aArguments, oContext);
			//
			var vResult	= fFunction.apply(oContext, aArguments);
			//
			return vResult == null ? [] : vResult instanceof cArray ? vResult : [vResult];
		}
		throw new cException("XPST0017"
//->Debug
				, "Unknown system function: " + sUri + '()'
//<-Debug
		);
	}
	else
	if (this.namespaceURI == sNS_XSD) {
		if ((fFunction = cStaticContext.dataTypes[this.localName]) && this.localName != "NOTATION" && this.localName != "anyAtomicType") {
			//
			fFunctionCall_prepare(this.localName, [[cXSAnyAtomicType, '?']], aArguments, oContext);
			//
			return aArguments[0] === null ? [] : [fFunction.cast(aArguments[0])];
		}
		throw new cException("XPST0017"
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
		return vResult == null ? [] : vResult instanceof cArray ? vResult : [vResult];
	}
	//
	throw new cException("XPST0017"
//->Debug
			, "Unknown user function: " + sUri + '()'
//<-Debug
	);
};

//->Debug
var aFunctionCall_numbers	= ["first", "second", "third", "fourth", "fifth"];
//<-Debug
function fFunctionCall_prepare(sName, aParameters, aArguments, oContext) {
	var oArgument,
		nArgumentsLength	= aArguments.length,
		oParameter,
		nParametersLength	= aParameters.length,
		nParametersRequired	= 0;

	// Determine amount of parameters required
	while ((nParametersRequired < aParameters.length) && !aParameters[nParametersRequired][2])
		nParametersRequired++;

	// Validate arguments length
	if (nArgumentsLength > nParametersLength)
		throw new cException("XPST0017"
//->Debug
				, "Function " + sName + "() must have " + (nParametersLength ? " no more than " : '') + nParametersLength + " argument" + (nParametersLength > 1 || !nParametersLength ? 's' : '')
//<-Debug
		);
	else
	if (nArgumentsLength < nParametersRequired)
		throw new cException("XPST0017"
//->Debug
				, "Function " + sName + "() must have " + (nParametersRequired == nParametersLength ? "exactly" : "at least") + ' ' + nParametersRequired + " argument" + (nParametersLength > 1 ? 's' : '')
//<-Debug
		);

	for (var nIndex = 0; nIndex < nArgumentsLength; nIndex++) {
		oParameter	= aParameters[nIndex];
		oArgument	= aArguments[nIndex];
		// Check sequence cardinality
		fFunctionCall_assertSequenceCardinality(oContext, oArgument, oParameter[1]
//->Debug
				, aFunctionCall_numbers[nIndex] + " argument of " + sName + '()'
//<-Debug
		);
		// Check sequence items data types consistency
		fFunctionCall_assertSequenceItemType(oContext, oArgument, oParameter[0]
//->Debug
				, aFunctionCall_numbers[nIndex] + " argument of " + sName + '()'
//<-Debug
		);
		if (oParameter[1] != '+' && oParameter[1] != '*')
			aArguments[nIndex]	= oArgument.length ? oArgument[0] : null;
	}
};

function fFunctionCall_assertSequenceItemType(oContext, oSequence, cItemType
//->Debug
		, sSource
//<-Debug
	) {
	//
	for (var nIndex = 0, nLength = oSequence.length, nNodeType, vItem; nIndex < nLength; nIndex++) {
		vItem	= oSequence[nIndex];
		// Node types
		if (cItemType == cXTNode || cItemType.prototype instanceof cXTNode) {
			// Check if is node
			if (!oContext.DOMAdapter.isNode(vItem))
				throw new cException("XPTY0004"
//->Debug
						, "Required item type of " + sSource + " is " + cItemType
//<-Debug
				);

			// Check node type
			if (cItemType != cXTNode) {
				nNodeType	= oContext.DOMAdapter.getProperty(vItem, "nodeType");
				if ([null, cXTElement, cXTAttribute, cXTText, cXTText, null, null, cXTProcessingInstruction, cXTComment, cXTDocument, null, null, null][nNodeType] != cItemType)
					throw new cException("XPTY0004"
//->Debug
							, "Required item type of " + sSource + " is " + cItemType
//<-Debug
					);
			}
		}
		else
		// Atomic types
		if (cItemType == cXSAnyAtomicType || cItemType.prototype instanceof cXSAnyAtomicType) {
			// Atomize item
			vItem	= fFunction_sequence_atomize([vItem], oContext)[0];
			// Convert type if necessary
			if (cItemType != cXSAnyAtomicType) {
				// Cast item to expected type if it's type is xs:untypedAtomic
				if (vItem instanceof cXSUntypedAtomic)
					vItem	= cItemType.cast(vItem);
				// Cast item to xs:string if it's type is xs:anyURI
				else
				if (cItemType == cXSString/* || cItemType.prototype instanceof cXSString*/) {
					if (vItem instanceof cXSAnyURI)
						vItem	= cXSString.cast(vItem);
				}
				else
				if (cItemType == cXSDouble/* || cItemType.prototype instanceof cXSDouble*/) {
					if (fXSAnyAtomicType_isNumeric(vItem))
						vItem	= cItemType.cast(vItem);
				}
			}
			// Check type
			if (!(vItem instanceof cItemType))
				throw new cException("XPTY0004"
//->Debug
						, "Required item type of " + sSource + " is " + cItemType
//<-Debug
				);
			// Write value back to sequence
			oSequence[nIndex]	= vItem;
		}
	}
};

function fFunctionCall_assertSequenceCardinality(oContext, oSequence, sCardinality
//->Debug
		, sSource
//<-Debug
	) {
	var nLength	= oSequence.length;
	// Check cardinality
	if (sCardinality == '?') {	// =0 or 1
		if (nLength > 1)
			throw new cException("XPTY0004"
//->Debug
					, "Required cardinality of " + sSource + " is one or zero"
//<-Debug
			);
	}
	else
	if (sCardinality == '+') {	// =1+
		if (nLength < 1)
			throw new cException("XPTY0004"
//->Debug
					, "Required cardinality of " + sSource + " is one or more"
//<-Debug
			);
	}
	else
	if (sCardinality != '*') {	// =1 ('*' =0+)
		if (nLength != 1)
			throw new cException("XPTY0004"
//->Debug
					, "Required cardinality of " + sSource + " is exactly one"
//<-Debug
			);
	}
};

//
module.exports = cFunctionCall;
