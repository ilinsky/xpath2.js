/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPath2() {

};

cXPath2.Parser		= cXPath2Parser;
cXPath2.Sequence	= cXPath2Sequence;
cXPath2.DOMAdapter	= cDOMAdapter;
//
cXPath2.evaluate	= function(sExpression/*[[[*/, oNode/*[[*/, oResolver/*[*/, oScope/*]]]*/) {
	return cXPath2.compile(sExpression, oResolver).evaluate(new cXPath2DynamicContext(oNode, 1, 1, oScope)).items;
};

cXPath2.resolve		= function(sExpression/*[[[*/, oNode/*[[*/, oResolver/*[*/, oScope/*]]]*/) {
	return cXPath2.compile(sExpression, oResolver).evaluate(new cXPath2DynamicContext(oNode, 1, 1, oScope)).items;
};

cXPath2.compile		= (function(sExpression/*[*/, oResolver/*]*/) {
	var oCache	= {},
		oDefaultResolver	= function (sPrefix) {
			if (sPrefix == "fn")
				return "http://www.w3.org/2005/xpath-functions";
			if (sPrefix == "xs")
				return "http://www.w3.org/2001/XMLSchema";
		};
	return function(sExpression, oResolver) {
		return oCache[sExpression] || (oCache[sExpression] = new cXPath2Parser().parse(sExpression, function(sPrefix) {
			var sNameSpaceURI;
			if (oResolver && (sNameSpaceURI = oResolver(sPrefix)))
				return sNameSpaceURI;
			if (sNameSpaceURI = oDefaultResolver(sPrefix))
				return sNameSpaceURI;
			//
			throw new cXPath2Error("XPST0081"
//->Debug
					, "Prefix '" + sPrefix + "' has not been declared"
//<-Debug
			);
		}));
	};
})();
