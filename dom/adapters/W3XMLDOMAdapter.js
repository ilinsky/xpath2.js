/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var oW3XMLDOMAdapter	= new cLXDOMAdapter;

// Document object members
/*oW3XMLDOMAdapter.getElementById	= function(oDocument, sId) {
	return oDocument.evaluate('/' + '/' + '*[@id="' + sId + '"]', oDocument, null, 9, null).singleNodeValue;
};*/
