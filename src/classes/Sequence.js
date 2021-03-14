/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cException = require('./Exception');

var cXSAnyAtomicType = require('./../types/schema/simple/XSAnyAtomicType');
var cXSUntypedAtomic = require('./../types/schema/simple/atomic/XSUntypedAtomic');
var cXSBoolean = require('./../types/schema/simple/atomic/XSBoolean');
var cXSDouble = require('./../types/schema/simple/atomic/XSDouble');
var cXSString = require('./../types/schema/simple/atomic/XSString');
var cXSAnyURI = require('./../types/schema/simple/atomic/XSAnyURI');

var cXTNode = require('./../types/xpath/XTNode');
var cXTElement = require('./../types/xpath/node/XTElement');
var cXTAttribute = require('./../types/xpath/node/XTAttribute');
var cXTText = require('./../types/xpath/node/XTText');
var cXTProcessingInstruction = require('./../types/xpath/node/XTProcessingInstruction');
var cXTComment = require('./../types/xpath/node/XTComment');
var cXTDocument = require('./../types/xpath/node/XTDocument');

var fIsNaN = global.isNaN;

function cSequence() {

};

// EBV calculation
cSequence.toEBV = function(oSequence1, oContext) {
	if (!oSequence1.length)
		return false;

	var oItem	= oSequence1[0];
	if (oContext.DOMAdapter.isNode(oItem))
		return true;

	if (oSequence1.length == 1) {
		if (oItem instanceof cXSBoolean)
			return oItem.value.valueOf();
		if (oItem instanceof cXSString)
			return !!oItem.valueOf().length;
		if (cXSAnyAtomicType.isNumeric(oItem))
			return !(fIsNaN(oItem.valueOf()) || oItem.valueOf() == 0);

		throw new cException("FORG0006"
//->Debug
				, "Effective boolean value is defined only for sequences containing booleans, strings, numbers, URIs, or nodes"
//<-Debug
		);
	}

	throw new cException("FORG0006"
//->Debug
			, "Effective boolean value is not defined for a sequence of two or more items"
//<-Debug
	);
};

cSequence.atomize = function(oSequence1, oContext) {
	var oSequence	= [];
	for (var nIndex = 0, nLength = oSequence1.length, oItem, vItem; nIndex < nLength; nIndex++) {
		oItem	= oSequence1[nIndex];
		vItem	= null;
		// Untyped
		if (oItem == null)
			vItem	= null;
		// Node type
		else
		if (oContext.DOMAdapter.isNode(oItem)) {
			var fGetProperty	= oContext.DOMAdapter.getProperty;
			switch (fGetProperty(oItem, "nodeType")) {
				case 1:	// ELEMENT_NODE
					vItem	= new cXSUntypedAtomic(fGetProperty(oItem, "textContent"));
					break;
				case 2:	// ATTRIBUTE_NODE
					vItem	= new cXSUntypedAtomic(fGetProperty(oItem, "value"));
					break;
				case 3:	// TEXT_NODE
				case 4:	// CDATA_SECTION_NODE
				case 8:	// COMMENT_NODE
					vItem	= new cXSUntypedAtomic(fGetProperty(oItem, "data"));
					break;
				case 7:	// PROCESSING_INSTRUCTION_NODE
					vItem	= new cXSUntypedAtomic(fGetProperty(oItem, "data"));
					break;
				case 9:	// DOCUMENT_NODE
					var oNode	= fGetProperty(oItem, "documentElement");
					vItem	= new cXSUntypedAtomic(oNode ? fGetProperty(oNode, "textContent") : '');
					break;
			}
		}
		// Base types
		else
		if (oItem instanceof cXSAnyAtomicType)
			vItem	= oItem;

		//
		if (vItem != null)
			oSequence.push(vItem);
	}

	return oSequence;
};

// Orders items in sequence in document order
cSequence.order = function(oSequence1, oContext) {
	return oSequence1.sort(function(oNode, oNode2) {
		var nPosition	= oContext.DOMAdapter.compareDocumentPosition(oNode, oNode2);
		return nPosition & 2 ? 1 : nPosition & 4 ?-1 : 0;
	});
};

cSequence.assertSequenceItemType = function(oSequence, oContext, cItemType
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
			vItem	= cSequence.atomize([vItem], oContext)[0];
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
					if (cXSAnyAtomicType.isNumeric(vItem))
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

cSequence.assertSequenceCardinality = function(oSequence, oContext, sCardinality
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
module.exports = cSequence;
