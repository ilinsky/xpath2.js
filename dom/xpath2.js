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
	files.push("../src/import.js");
	// Helper classes
	files.push("../src/helpers/DOMAdapter.js");
	files.push("../src/helpers/XPath2Error.js");
	files.push("../src/helpers/XPath2Context.js");
	files.push("../src/helpers/XPath2Lexer.js");
	files.push("../src/helpers/XPath2Parser.js");
	files.push("../src/helpers/XPath2Sequence.js");
	//
	files.push("../src/expressions/Expr.js");
	files.push("../src/expressions/ExprSingle.js");
	//
	files.push("../src/expressions/for/ForExpr.js");
	//
	files.push("../src/expressions/if/IfExpr.js");
	//
	files.push("../src/expressions/quantified/QuantifiedExpr.js");
	//
	files.push("../src/expressions/comparison/ComparisonExpr.js");
	//
	files.push("../src/expressions/arithmetic/AdditiveExpr.js");
	files.push("../src/expressions/arithmetic/MultiplicativeExpr.js");
	files.push("../src/expressions/arithmetic/UnaryExpr.js");
	files.push("../src/expressions/arithmetic/ValueExpr.js");
	//
	files.push("../src/expressions/logical/OrExpr.js");
	files.push("../src/expressions/logical/AndExpr.js");
	//
	files.push("../src/expressions/path/AxisStep.js");
	files.push("../src/expressions/path/PathExpr.js");
	files.push("../src/expressions/path/StepExpr.js");
	// Tests
	files.push("../src/expressions/path/tests/NodeTest.js");
	files.push("../src/expressions/path/tests/KindTest.js");
	files.push("../src/expressions/path/tests/NameTest.js");
	//
	files.push("../src/expressions/primary/PrimaryExpr.js");
	files.push("../src/expressions/primary/ParenthesizedExpr.js");
	files.push("../src/expressions/primary/ContextItemExpr.js");
	files.push("../src/expressions/primary/Literal.js");
	files.push("../src/expressions/primary/NumericLiteral.js");
	files.push("../src/expressions/primary/StringLiteral.js");
	files.push("../src/expressions/primary/FilterExpr.js");
	files.push("../src/expressions/primary/VarRef.js");
	files.push("../src/expressions/primary/FunctionCall.js");
	//
	files.push("../src/expressions/sequence/IntersectExceptExpr.js");
	files.push("../src/expressions/sequence/RangeExpr.js");
	files.push("../src/expressions/sequence/UnionExpr.js");
	//
	files.push("../src/expressions/type/InstanceofExpr.js");
	files.push("../src/expressions/type/TreatExpr.js");
	files.push("../src/expressions/type/CastableExpr.js");
	files.push("../src/expressions/type/CastExpr.js");
	files.push("../src/expressions/type/types/AtomicType.js");
	files.push("../src/expressions/type/types/ItemType.js");
	files.push("../src/expressions/type/types/SequenceType.js");
	files.push("../src/expressions/type/types/SingleType.js");
	// Functions
	files.push("../src/functions/accessor.js");
	files.push("../src/functions/anyuri.js");
	files.push("../src/functions/binary.js");
	files.push("../src/functions/boolean.js");
	files.push("../src/functions/context.js");
	files.push("../src/functions/date.js");
	files.push("../src/functions/node.js");
	files.push("../src/functions/notation.js");
	files.push("../src/functions/numeric.js");
	files.push("../src/functions/qname.js");
	files.push("../src/functions/sequence.js");
	files.push("../src/functions/string.js");
	// Core API
	files.push("../src/XPath2.js");
	// DOM-XPath API
	files.push("classes/XPathEvaluator.js");
	files.push("classes/XPathException.js");
	files.push("classes/XPathExpression.js");
	files.push("classes/XPathNSResolver.js");
	files.push("classes/XPathResult.js");
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
						"(function(){" +
							source.join("\n") +
						"})()" +
						"";
	oScript.parentNode.removeChild(oScript);
})();
