/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cXPathError(sCode) {
	this.code		= sCode;
	this.message	= oXPathError_messages[sCode];
};

// "http://www.w3.org/2005/xqt-errors"

var oXPathError_messages	= {};
oXPathError_messages["XPST0003"]	= "Expression is not a valid instance of the grammar";
oXPathError_messages["XPTY0004"]	= "Type is not appropriate for the context in which the expression occurs";
oXPathError_messages["XPST0008"]	= "Expression refers to an element name, attribute name, schema type name, namespace prefix, or variable name that is not defined in the static context";
oXPathError_messages["XPST0010"]	= "Axis not supported";
oXPathError_messages["XPST0017"]	= "Expanded QName and number of arguments in a function call do not match the name and arity of a function signature";
oXPathError_messages["XPTY0018"]	= "The result of the last step in a path expression contains both nodes and atomic values";
oXPathError_messages["XPTY0019"]	= "The result of a step (other than the last step) in a path expression contains an atomic value.";
oXPathError_messages["XPTY0020"]	= "In an axis step, the context item is not a node.";
oXPathError_messages["XPST0081"]	= "A QName used in an expression contains a namespace prefix that cannot be expanded into a namespace URI by using the statically known namespaces.";

