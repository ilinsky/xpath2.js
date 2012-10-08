/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

(function() {
	var files	= [];
	// API classes
	files.push("src/XPathEvaluator.js");
	files.push("src/XPathException.js");
	files.push("src/XPathExpression.js");
	files.push("src/XPathNamespace.js");
	files.push("src/XPathNSResolver.js");
	files.push("src/XPathResult.js");
	// Helper classes
	files.push("src/helpers/XPathContext.js");
	files.push("src/helpers/XPathLexer.js");
	files.push("src/helpers/XPathSequence.js");
	//
	files.push("src/expressions/Expr.js");
	files.push("src/expressions/ExprSingle.js");
	files.push("src/expressions/ForExpr.js");
	files.push("src/expressions/IfExpr.js");
	files.push("src/expressions/QuantifiedExpr.js");
	//
	files.push("src/expressions/arithmetic/AdditiveExpr.js");
	files.push("src/expressions/arithmetic/MultiplicativeExpr.js");
	files.push("src/expressions/arithmetic/UnaryExpr.js");
	files.push("src/expressions/arithmetic/ValueExpr.js");
	//
	files.push("src/expressions/comparison/ComparisonExpr.js");
	//
	files.push("src/expressions/logical/OrExpr.js");
	files.push("src/expressions/logical/AndExpr.js");
	//
	files.push("src/expressions/path/AxisStep.js");
	files.push("src/expressions/path/PathExpr.js");
	files.push("src/expressions/path/StepExpr.js");
	// Tests
	files.push("src/expressions/path/tests/NodeTest.js");
	files.push("src/expressions/path/tests/KindTest.js");
	files.push("src/expressions/path/tests/NameTest.js");
	//
	files.push("src/expressions/primary/PrimaryExpr.js");
	files.push("src/expressions/primary/ParenthesizedExpr.js");
	files.push("src/expressions/primary/ContextItemExpr.js");
	files.push("src/expressions/primary/Literal.js");
	files.push("src/expressions/primary/NumericLiteral.js");
	files.push("src/expressions/primary/StringLiteral.js");
	files.push("src/expressions/primary/FilterExpr.js");
	files.push("src/expressions/primary/VarRef.js");
	files.push("src/expressions/primary/FunctionCall.js");
	//
	files.push("src/expressions/sequence/IntersectExceptExpr.js");
	files.push("src/expressions/sequence/RangeExpr.js");
	files.push("src/expressions/sequence/UnionExpr.js");
	//
//	files.push("src/expressions/InstanceofExpr.js");
//	files.push("src/expressions/TreatExpr.js");
//	files.push("src/expressions/CastableExpr.js");
//	files.push("src/expressions/CastExpr.js");
	// Functions
	files.push("src/functions/accessor.js");
	files.push("src/functions/anyuri.js");
	files.push("src/functions/binary.js");
	files.push("src/functions/boolean.js");
	files.push("src/functions/context.js");
	files.push("src/functions/date.js");
	files.push("src/functions/node.js");
	files.push("src/functions/notation.js");
	files.push("src/functions/numeric.js");
	files.push("src/functions/qname.js");
	files.push("src/functions/sequence.js");
	files.push("src/functions/string.js");

	// load files
	var source	= [],
		scripts	= document.getElementsByTagName("script"),
		base	= scripts[scripts.length-1].src.replace(/\/?[^\/]+$/, '');
	for (var n = 0; n < files.length; n++) {
		var oRequest	= new (window.XMLHttpRequest ? XMLHttpRequest : ActiveXObject("Microsoft.XMLHTTP"));
		oRequest.open("GET", base + '/' + files[n], false);
		oRequest.send(null);
		source[source.length]	= oRequest.responseText;
	}
	var oScript	= document.getElementsByTagName("head")[0].appendChild(document.createElement("script"));
	oScript.type	= "text/javascript";
	oScript.text	= source.join("\n");
	oScript.parentNode.removeChild(oScript);
})();
