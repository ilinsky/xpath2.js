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
	// Import objects from environment
	files.push("import.js");
	// Helper classes
	files.push("helpers/DOMAdapter.js");
	files.push("helpers/XPath2Error.js");
	files.push("helpers/XPath2Lexer.js");
	files.push("helpers/XPath2Parser.js");
	files.push("helpers/XPath2Context.js");
	files.push("helpers/XPath2Sequence.js");
	//
	files.push("expressions/Expr.js");
	files.push("expressions/ExprSingle.js");
	//
	files.push("expressions/for/ForExpr.js");
	//
	files.push("expressions/if/IfExpr.js");
	//
	files.push("expressions/quantified/QuantifiedExpr.js");
	//
	files.push("expressions/comparison/ComparisonExpr.js");
	//
	files.push("expressions/arithmetic/AdditiveExpr.js");
	files.push("expressions/arithmetic/MultiplicativeExpr.js");
	files.push("expressions/arithmetic/UnaryExpr.js");
	files.push("expressions/arithmetic/ValueExpr.js");
	//
	files.push("expressions/logical/OrExpr.js");
	files.push("expressions/logical/AndExpr.js");
	//
	files.push("expressions/path/AxisStep.js");
	files.push("expressions/path/PathExpr.js");
	files.push("expressions/path/StepExpr.js");
	// Tests
	files.push("expressions/path/tests/NodeTest.js");
	files.push("expressions/path/tests/KindTest.js");
	files.push("expressions/path/tests/NameTest.js");
	//
	files.push("expressions/primary/PrimaryExpr.js");
	files.push("expressions/primary/ParenthesizedExpr.js");
	files.push("expressions/primary/ContextItemExpr.js");
	files.push("expressions/primary/Literal.js");
	files.push("expressions/primary/NumericLiteral.js");
	files.push("expressions/primary/StringLiteral.js");
	files.push("expressions/primary/FilterExpr.js");
	files.push("expressions/primary/VarRef.js");
	files.push("expressions/primary/FunctionCall.js");
	//
	files.push("expressions/sequence/IntersectExceptExpr.js");
	files.push("expressions/sequence/RangeExpr.js");
	files.push("expressions/sequence/UnionExpr.js");
	//
//	files.push("expressions/InstanceofExpr.js");
//	files.push("expressions/TreatExpr.js");
//	files.push("expressions/CastableExpr.js");
//	files.push("expressions/CastExpr.js");
	// Functions
	files.push("functions/accessor.js");
	files.push("functions/anyuri.js");
	files.push("functions/binary.js");
	files.push("functions/boolean.js");
	files.push("functions/context.js");
	files.push("functions/date.js");
	files.push("functions/node.js");
	files.push("functions/notation.js");
	files.push("functions/numeric.js");
	files.push("functions/qname.js");
	files.push("functions/sequence.js");
	files.push("functions/string.js");

	// Export objects to environment
	files.push("export.js");

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
	oScript.text	= 	"" +
	//					"(function(){" +
							source.join("\n") +
	//					"})()" +
						"";
	oScript.parentNode.removeChild(oScript);
})();
