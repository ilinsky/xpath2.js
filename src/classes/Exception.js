var cError = global.Error;

function cException(sCode
//->Debug
		, sMessage
//<-Debug
	) {

	this.code		= sCode;
	this.message	=
//->Debug
						sMessage ||
//<-Debug
						oException_messages[sCode];
};

cException.prototype	= new cError;

// "http://www.w3.org/2005/xqt-errors"

var oException_messages	= {};
oException_messages["XPDY0002"]	= "Evaluation of an expression relies on some part of the dynamic context that has not been assigned a value.";
oException_messages["XPST0003"]	= "Expression is not a valid instance of the grammar";
oException_messages["XPTY0004"]	= "Type is not appropriate for the context in which the expression occurs";
oException_messages["XPST0008"]	= "Expression refers to an element name, attribute name, schema type name, namespace prefix, or variable name that is not defined in the static context";
oException_messages["XPST0010"]	= "Axis not supported";
oException_messages["XPST0017"]	= "Expanded QName and number of arguments in a function call do not match the name and arity of a function signature";
oException_messages["XPTY0018"]	= "The result of the last step in a path expression contains both nodes and atomic values";
oException_messages["XPTY0019"]	= "The result of a step (other than the last step) in a path expression contains an atomic value.";
oException_messages["XPTY0020"]	= "In an axis step, the context item is not a node.";
oException_messages["XPST0051"]	= "It is a static error if a QName that is used as an AtomicType in a SequenceType is not defined in the in-scope schema types as an atomic type.";
oException_messages["XPST0081"]	= "A QName used in an expression contains a namespace prefix that cannot be expanded into a namespace URI by using the statically known namespaces.";
//
oException_messages["FORG0001"]	= "Invalid value for cast/constructor.";
oException_messages["FORG0003"]	= "fn:zero-or-one called with a sequence containing more than one item.";
oException_messages["FORG0004"]	= "fn:one-or-more called with a sequence containing no items.";
oException_messages["FORG0005"]	= "fn:exactly-one called with a sequence containing zero or more than one item.";
oException_messages["FORG0006"]	= "Invalid argument type.";
//
oException_messages["FODC0001"]	= "No context document.";
//
oException_messages["FORX0001"]	= "Invalid regular expression flags.";
//
oException_messages["FOCA0002"]	= "Invalid lexical value.";
//
oException_messages["FOCH0002"]	= "Unsupported collation.";

oException_messages["FONS0004"]	= "No namespace found for prefix.";

//
module.exports = cException;
