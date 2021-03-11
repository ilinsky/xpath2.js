var cException = require('./../classes/Exception');

var cStaticContext = require('./../classes/StaticContext');

var cXSString = require('./../types/schema/simple/atomic/XSString');
var cXSDouble = require('./../types/schema/simple/atomic/XSDouble');
var cXSDecimal = require('./../types/schema/simple/atomic/XSDecimal');
var cXSInteger = require('./../types/schema/simple/atomic/integer/XSInteger');

var cExpr = require('./Expr');

// arithmetic
var cAdditiveExpr = require('./arithmetic/AdditiveExpr');
var cMultiplicativeExpr = require('./arithmetic/MultiplicativeExpr');
var cUnaryExpr = require('./arithmetic/UnaryExpr');

// comparison
var cComparisonExpr = require('./comparison/ComparisonExpr');

// for
var cForExpr = require('./for/ForExpr');
var cSimpleForBinding = require('./for/SimpleForBinding');

// if
var cIfExpr = require('./if/IfExpr');

// logical
var cAndExpr = require('./logical/AndExpr');
var cOrExpr = require('./logical/OrExpr');

// path/tests
var cKindTest = require('./path/tests/KindTest');
var cNameTest = require('./path/tests/NameTest');

// path
var cAxisStep = require('./path/AxisStep');
var cPathExpr = require('./path/PathExpr');

// primary
var cContextItemExpr = require('./primary/ContextItemExpr');
var cFilterExpr = require('./primary/FilterExpr');
var cFunctionCall = require('./primary/FunctionCall');
var cNumericLiteral = require('./primary/NumericLiteral');
var cParenthesizedExpr = require('./primary/ParenthesizedExpr');
var cStringLiteral = require('./primary/StringLiteral');
var cVarRef = require('./primary/VarRef');

// quantified
var cQuantifiedExpr = require('./quantified/QuantifiedExpr');
var cSimpleQuantifiedBinding = require('./quantified/SimpleQuantifiedBinding');

// sequence
var cIntersectExceptExpr = require('./sequence/IntersectExceptExpr');
var cRangeExpr = require('./sequence/RangeExpr');
var cUnionExpr = require('./sequence/UnionExpr');

// type/types
var cAtomicType = require('./type/types/AtomicType');
var cItemType = require('./type/types/ItemType');
var cSequenceType = require('./type/types/SequenceType');
var cSingleType = require('./type/types/SingleType');

// type
var cCastableExpr = require('./type/CastableExpr');
var cCastExpr = require('./type/CastExpr');
var cInstanceofExpr = require('./type/InstanceofExpr');
var cTreatExpr = require('./type/TreatExpr');

var rNameTest = /^(?:(?![0-9-])(\w[\w.-]*|\*)\:)?(?![0-9-])(\w[\w.-]*|\*)$/;

function fParseExpr(oLexer, oStaticContext) {
	var oItem;
	if (oLexer.eof() ||!(oItem = fParseExprSingle(oLexer, oStaticContext)))
		return;

	// Create expression
	var oExpr	= new cExpr;
	oExpr.items.push(oItem);
	while (oLexer.peek() == ',') {
		oLexer.next();
		if (oLexer.eof() ||!(oItem = fParseExprSingle(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected expression"
//<-Debug
			);
		oExpr.items.push(oItem);
	}
	return oExpr;
};

function fParseExprSingle(oLexer, oStaticContext) {
    return fParseIfExpr(oLexer, oStaticContext)
		|| fParseForExpr(oLexer, oStaticContext)
		|| fParseQuantifiedExpr(oLexer, oStaticContext)
		|| fParseOrExpr(oLexer, oStaticContext);
};

// arithmetic
function fParseAdditiveExpr(oLexer, oStaticContext) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = fParseMultiplicativeExpr(oLexer, oStaticContext)))
		return;
	if (!(oLexer.peek() in cAdditiveExpr.operators))
		return oExpr;

	// Additive expression
	var oAdditiveExpr	= new cAdditiveExpr(oExpr),
		sOperator;
	while ((sOperator = oLexer.peek()) in cAdditiveExpr.operators) {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseMultiplicativeExpr(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected second operand in additive expression"
//<-Debug
			);
		oAdditiveExpr.items.push([sOperator, oExpr]);
	}
	return oAdditiveExpr;
};

function fParseMultiplicativeExpr(oLexer, oStaticContext) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = fParseUnionExpr(oLexer, oStaticContext)))
		return;
	if (!(oLexer.peek() in cMultiplicativeExpr.operators))
		return oExpr;

	// Additive expression
	var oMultiplicativeExpr	= new cMultiplicativeExpr(oExpr),
		sOperator;
	while ((sOperator = oLexer.peek()) in cMultiplicativeExpr.operators) {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseUnionExpr(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected second operand in multiplicative expression"
//<-Debug
			);
		oMultiplicativeExpr.items.push([sOperator, oExpr]);
	}
	return oMultiplicativeExpr;
};

// UnaryExpr	:= ("-" | "+")* ValueExpr
function fParseUnaryExpr(oLexer, oStaticContext) {
	if (oLexer.eof())
		return;
	if (!(oLexer.peek() in cUnaryExpr.operators))
		return fParseValueExpr(oLexer, oStaticContext);

	// Unary expression
	var sOperator	= '+',
		oExpr;
	while (oLexer.peek() in cUnaryExpr.operators) {
		if (oLexer.peek() == '-')
			sOperator	= sOperator == '-' ? '+' : '-';
		oLexer.next();
	}
	if (oLexer.eof() ||!(oExpr = fParseValueExpr(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected operand in unary expression"
//<-Debug
		);
	return new cUnaryExpr(sOperator, oExpr);
};

function fParseValueExpr(oLexer, oStaticContext) {
	return fParsePathExpr(oLexer, oStaticContext);
};

// comparision
function fParseComparisonExpr(oLexer, oStaticContext) {
	var oExpr,
		oRight;
	if (oLexer.eof() ||!(oExpr = fParseRangeExpr(oLexer, oStaticContext)))
		return;
	if (!(oLexer.peek() in cComparisonExpr.operators))
		return oExpr;

	// Comparison expression
	var sOperator	= oLexer.peek();
	oLexer.next();
	if (oLexer.eof() ||!(oRight = fParseRangeExpr(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected second operand in comparison expression"
//<-Debug
		);
	return new cComparisonExpr(oExpr, oRight, sOperator);
};

// for
function fParseForExpr(oLexer, oStaticContext) {
	if (oLexer.peek() == "for" && oLexer.peek(1).substr(0, 1) == '$') {
		oLexer.next();

		var oForExpr	= new cForExpr,
			oExpr;
		do {
			oForExpr.bindings.push(fParseSimpleForBinding(oLexer, oStaticContext));
		}
		while (oLexer.peek() == ',' && oLexer.next());

		if (oLexer.peek() != "return")
			throw new cException("XPST0003"
//->Debug
					, "Expected 'return' token in for expression"
//<-Debug
			);

		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseExprSingle(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected return statement operand in for expression"
//<-Debug
			);

		oForExpr.returnExpr	= oExpr;

		return oForExpr;
	}
};

function fParseSimpleForBinding(oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().substr(1).match(rNameTest);
	if (!aMatch)
		throw new cException("XPST0003"
//->Debug
				, "Expected binding in for expression"
//<-Debug
		);

	if (aMatch[1] == '*' || aMatch[2] == '*')
		throw new cException("XPST0003"
//->Debug
				, "Illegal use of wildcard in for expression binding variable name"
//<-Debug
		);

	oLexer.next();
	if (oLexer.peek() != "in")
		throw new cException("XPST0003"
//->Debug
				, "Expected 'in' token in for expression binding"
//<-Debug
		);

	oLexer.next();
	var oExpr;
	if (oLexer.eof() ||!(oExpr = fParseExprSingle(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected in statement operand in for expression binding"
//<-Debug
		);

	return new cSimpleForBinding(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) : null, oExpr);
};

// if
function fParseIfExpr(oLexer, oStaticContext) {
	var oCondExpr,
		oThenExpr,
		oElseExpr;
	if (oLexer.peek() == "if" && oLexer.peek(1) == '(') {
		oLexer.next(2);
		//
		if (oLexer.eof() ||!(oCondExpr = fParseExpr(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected if statement operand in conditional expression"
//<-Debug
			);
		//
		if (oLexer.peek() != ')')
			throw new cException("XPST0003"
//->Debug
					, "Expected ')' token in for expression"
//<-Debug
			);

		oLexer.next();
		if (oLexer.peek() != "then")
			throw new cException("XPST0003"
//->Debug
					, "Expected 'then' token in conditional if expression"
//<-Debug
			);

		oLexer.next();
		if (oLexer.eof() ||!(oThenExpr = fParseExprSingle(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected then statement operand in conditional expression"
//<-Debug
			);

		if (oLexer.peek() != "else")
			throw new cException("XPST0003"
//->Debug
					, "Expected 'else' token in conditional if expression"
//<-Debug
			);

		oLexer.next();
		if (oLexer.eof() ||!(oElseExpr = fParseExprSingle(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected else statement operand in conditional expression"
//<-Debug
			);
		//
		return new cIfExpr(oCondExpr, oThenExpr, oElseExpr);
	}
};

// logical
function fParseAndExpr(oLexer, oStaticContext) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = fParseComparisonExpr(oLexer, oStaticContext)))
		return;
	if (oLexer.peek() != "and")
		return oExpr;

	// And expression
	var oAndExpr	= new cAndExpr(oExpr);
	while (oLexer.peek() == "and") {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseComparisonExpr(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected second operand in logical expression"
//<-Debug
			);
		oAndExpr.items.push(oExpr);
	}
	return oAndExpr;
};

function fParseOrExpr(oLexer, oStaticContext) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = fParseAndExpr(oLexer, oStaticContext)))
		return;
	if (oLexer.peek() != "or")
		return oExpr;

	// Or expression
	var oOrExpr	= new cOrExpr(oExpr);
	while (oLexer.peek() == "or") {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseAndExpr(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected second operand in logical expression"
//<-Debug
			);
		oOrExpr.items.push(oExpr);
	}
	return oOrExpr;
};

// path/tests
function fParseKindTest(oLexer, oStaticContext) {
	var sName	= oLexer.peek(),
		oValue;
	if (oLexer.peek(1) == '(') {
		//
		if (!(sName in cKindTest.names))
			throw new cException("XPST0003"
//->Debug
					, "Unknown '" + sName + "' kind test"
//<-Debug
			);

		//
		oLexer.next(2);
		//
		var oTest	= new cKindTest(sName);
		if (oLexer.peek() != ')') {
			if (sName == "document-node") {
				// TODO: parse test further
			}
			else
			if (sName == "element") {
				// TODO: parse test further
			}
			else
			if (sName == "attribute") {
				// TODO: parse test further
			}
			else
			if (sName == "processing-instruction") {
				oValue = fParseStringLiteral(oLexer, oStaticContext);
				if (!oValue) {
					oValue = new cStringLiteral(new cXSString(oLexer.peek()));
					oLexer.next();
				}
				oTest.args.push(oValue);
			}
			else
			if (sName == "schema-attribute") {
				// TODO: parse test further
			}
			else
			if (sName == "schema-element") {
				// TODO: parse test further
			}
		}
		else {
			if (sName == "schema-attribute")
				throw new cException("XPST0003"
//->Debug
						, "Expected attribute declaration in 'schema-attribute' kind test"
//<-Debug
				);
			else
			if (sName == "schema-element")
				throw new cException("XPST0003"
//->Debug
						, "Expected element declaration in 'schema-element' kind test"
//<-Debug
				);
		}

		if (oLexer.peek() != ')')
			throw new cException("XPST0003"
//->Debug
					, "Expected ')' token in kind test"
//<-Debug
			);
		oLexer.next();

		return oTest;
	}
};

function fParseNameTest(oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().match(rNameTest);
	if (aMatch) {
		if (aMatch[1] == '*' && aMatch[2] == '*')
			throw new cException("XPST0003"
//->Debug
					, "Illegal use of *:* wildcard in name test"
//<-Debug
			);
		oLexer.next();
		return new cNameTest(aMatch[1] || null, aMatch[2], aMatch[1] ? aMatch[1] == '*' ? '*' : oStaticContext.getURIForPrefix(aMatch[1]) || null : oStaticContext.defaultElementNamespace);
	}
};

function fParseNodeTest(oLexer, oStaticContext) {
	if (!oLexer.eof())
		return fParseKindTest(oLexer, oStaticContext)
			|| fParseNameTest(oLexer, oStaticContext);
};

// path
function fParseAxisStep(oLexer, oStaticContext) {
	var sAxis	= oLexer.peek(),
		oExpr,
		oStep;
	if (oLexer.peek(1) == '::') {
		if (!(sAxis in cAxisStep.axises))
			throw new cException("XPST0003"
//->Debug
					, "Unknown axis name: " + sAxis
//<-Debug
			);

		oLexer.next(2);
		if (oLexer.eof() ||!(oExpr = fParseNodeTest(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected node test expression in axis step"
//<-Debug
			);
		//
		oStep	= new cAxisStep(sAxis, oExpr);
	}
	else
	if (sAxis == '..') {
		oLexer.next();
		oStep	= new cAxisStep("parent", new cKindTest("node"));
	}
	else
	if (sAxis == '@') {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseNodeTest(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected node test expression in axis step"
//<-Debug
			);
		//
		oStep	= new cAxisStep("attribute", oExpr);
	}
	else {
		if (oLexer.eof() ||!(oExpr = fParseNodeTest(oLexer, oStaticContext)))
			return;
		oStep	= new cAxisStep(oExpr instanceof cKindTest && oExpr.name == "attribute" ? "attribute" : "child", oExpr);
	}
	//
	fParseStepExprPredicates(oLexer, oStaticContext, oStep);

	return oStep;
};

function fParsePathExpr(oLexer, oStaticContext) {
	if (oLexer.eof())
		return;
	var sSingleSlash	= '/',
		sDoubleSlash	= '/' + '/';

	var oPathExpr	= new cPathExpr(),
		sSlash	= oLexer.peek(),
		oExpr;
	// Parse first step
	if (sSlash == sDoubleSlash || sSlash == sSingleSlash) {
		oLexer.next();
		oPathExpr.items.push(new cFunctionCall(null, "root", cStaticContext.NS_XPF));
		//
		if (sSlash == sDoubleSlash)
			oPathExpr.items.push(new cAxisStep("descendant-or-self", new cKindTest("node")));
	}

	//
	if (oLexer.eof() ||!(oExpr = fParseStepExpr(oLexer, oStaticContext))) {
		if (sSlash == sSingleSlash)
			return oPathExpr.items[0];	// '/' expression
		if (sSlash == sDoubleSlash)
			throw new cException("XPST0003"
//->Debug
					, "Expected path step expression"
//<-Debug
			);
		return;
	}
	oPathExpr.items.push(oExpr);

	// Parse other steps
	while ((sSlash = oLexer.peek()) == sSingleSlash || sSlash == sDoubleSlash) {
		if (sSlash == sDoubleSlash)
			oPathExpr.items.push(new cAxisStep("descendant-or-self", new cKindTest("node")));
		//
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseStepExpr(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected path step expression"
//<-Debug
			);
		//
		oPathExpr.items.push(oExpr);
	}

	if (oPathExpr.items.length == 1)
		return oPathExpr.items[0];

	//
	return oPathExpr;
};

function fParseStepExpr(oLexer, oStaticContext) {
	if (!oLexer.eof())
		return fParseFilterExpr(oLexer, oStaticContext)
			|| fParseAxisStep(oLexer, oStaticContext);
};

function fParseStepExprPredicates(oLexer, oStaticContext, oStep) {
	var oExpr;
	// Parse predicates
	while (oLexer.peek() == '[') {
		oLexer.next();

		if (oLexer.eof() ||!(oExpr = fParseExpr(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected expression in predicate"
//<-Debug
			);

		oStep.predicates.push(oExpr);

		if (oLexer.peek() != ']')
			throw new cException("XPST0003"
//->Debug
					, "Expected ']' token in predicate"
//<-Debug
			);

		oLexer.next();
	}
};

// primary
function fParseContextItemExpr(oLexer, oStaticContext) {
	if (oLexer.peek() == '.') {
		oLexer.next();
		return new cContextItemExpr;
	}
};

function fParseFilterExpr(oLexer, oStaticContext) {
	var oExpr;
	if (oLexer.eof() ||!(oExpr = fParsePrimaryExpr(oLexer, oStaticContext)))
		return;

	var oFilterExpr	= new cFilterExpr(oExpr);
	// Parse predicates
    fParseStepExprPredicates(oLexer, oStaticContext, oFilterExpr);

	// If no predicates found
	if (oFilterExpr.predicates.length == 0)
		return oFilterExpr.expression;

	return oFilterExpr;
};

function fParseFunctionCall(oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().match(rNameTest);
	if (aMatch && oLexer.peek(1) == '(') {
		// Reserved "functions"
		if (!aMatch[1] && (aMatch[2] in cKindTest.names))
			return fParseAxisStep(oLexer, oStaticContext);
		// Other functions
		if (aMatch[1] == '*' || aMatch[2] == '*')
			throw new cException("XPST0003"
//->Debug
					, "Illegal use of wildcard in function name"
//<-Debug
			);

		var oFunctionCallExpr	= new cFunctionCall(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) || null : oStaticContext.defaultFunctionNamespace),
			oExpr;
		oLexer.next(2);
		//
		if (oLexer.peek() != ')') {
			do {
				if (oLexer.eof() ||!(oExpr = fParseExprSingle(oLexer, oStaticContext)))
					throw new cException("XPST0003"
//->Debug
							, "Expected function call argument"
//<-Debug
					);
				//
				oFunctionCallExpr.args.push(oExpr);
			}
			while (oLexer.peek() == ',' && oLexer.next());
			//
			if (oLexer.peek() != ')')
				throw new cException("XPST0003"
//->Debug
						, "Expected ')' token in function call"
//<-Debug
				);
		}
		oLexer.next();
		return oFunctionCallExpr;
	}
};

function fParseLiteral(oLexer, oStaticContext) {
	if (!oLexer.eof())
		return fParseNumericLiteral(oLexer, oStaticContext)
			|| fParseStringLiteral(oLexer, oStaticContext);
};

// Integer | Decimal | Double
var rNumericLiteral	= /^[+-]?(?:(?:(\d+)(?:\.(\d*))?)|(?:\.(\d+)))(?:[eE]([+-])?(\d+))?$/;
function fParseNumericLiteral(oLexer, oStaticContext) {
    var sValue = oLexer.peek(),
        aMatch = sValue.match(rNumericLiteral);
    if (aMatch) {
        var cType	= cXSInteger;
        if (aMatch[5])
            cType	= cXSDouble;
        else
        if (aMatch[2] || aMatch[3])
            cType	= cXSDecimal;
		oLexer.next();
        return new cNumericLiteral(new cType(+sValue));
    }
};

function fParseParenthesizedExpr(oLexer, oStaticContext) {
	if (oLexer.peek() == '(') {
		oLexer.next();
		// Check if not empty (allowed)
		var oExpr	= null;
		if (oLexer.peek() != ')')
			oExpr	= fParseExpr(oLexer, oStaticContext);

		//
		if (oLexer.peek() != ')')
			throw new cException("XPST0003"
//->Debug
					, "Expected ')' token in parenthesized expression"
//<-Debug
			);

		oLexer.next();

		//
		return new cParenthesizedExpr(oExpr);
	}
};

function fParsePrimaryExpr(oLexer, oStaticContext) {
	if (!oLexer.eof())
		return fParseContextItemExpr(oLexer, oStaticContext)
			|| fParseParenthesizedExpr(oLexer, oStaticContext)
			|| fParseFunctionCall(oLexer, oStaticContext)
			|| fParseVarRef(oLexer, oStaticContext)
			|| fParseLiteral(oLexer, oStaticContext);
};

var rStringLiteral	= /^'([^']*(?:''[^']*)*)'|"([^"]*(?:""[^"]*)*)"$/;
function fParseStringLiteral(oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().match(rStringLiteral);
	if (aMatch) {
		oLexer.next();
		return new cStringLiteral(new cXSString(aMatch[1] ? aMatch[1].replace("''", "'") : aMatch[2] ? aMatch[2].replace('""', '"') : ''));
	}
};

function fParseVarRef(oLexer, oStaticContext) {
	if (oLexer.peek().substr(0, 1) == '$') {
		var aMatch	= oLexer.peek().substr(1).match(rNameTest);
		if (aMatch) {
			if (aMatch[1] == '*' || aMatch[2] == '*')
				throw new cException("XPST0003"
//->Debug
						, "Illegal use of wildcard in var expression variable name"
//<-Debug
				);

			var oVarRef	= new cVarRef(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) : null);
			oLexer.next();
			return oVarRef;
		}
	}
};

// quantified
function fParseQuantifiedExpr(oLexer, oStaticContext) {
	var sQuantifier	= oLexer.peek();
	if ((sQuantifier == "some" || sQuantifier == "every") && oLexer.peek(1).substr(0, 1) == '$') {
		oLexer.next();

		var oQuantifiedExpr	= new cQuantifiedExpr(sQuantifier),
			oExpr;
		do {
			oQuantifiedExpr.bindings.push(fParseSimpleQuantifiedBinding(oLexer, oStaticContext));
		}
		while (oLexer.peek() == ',' && oLexer.next());

		if (oLexer.peek() != "satisfies")
			throw new cException("XPST0003"
//->Debug
					, "Expected 'satisfies' token in quantified expression"
//<-Debug
			);

		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseExprSingle(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected satisfies statement operand in quantified expression"
//<-Debug
			);

		oQuantifiedExpr.satisfiesExpr	= oExpr;

		return oQuantifiedExpr;
	}
};

function fParseSimpleQuantifiedBinding(oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().substr(1).match(rNameTest);
	if (!aMatch)
		throw new cException("XPST0003"
//->Debug
				, "Expected binding in quantified expression"
//<-Debug
		);

	if (aMatch[1] == '*' || aMatch[2] == '*')
		throw new cException("XPST0003"
//->Debug
				, "Illegal use of wildcard in quantified expression binding variable name"
//<-Debug
		);

	oLexer.next();
	if (oLexer.peek() != "in")
		throw new cException("XPST0003"
//->Debug
				, "Expected 'in' token in quantified expression binding"
//<-Debug
		);

	oLexer.next();
	var oExpr;
	if (oLexer.eof() ||!(oExpr = fParseExprSingle(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected in statement operand in quantified expression binding"
//<-Debug
		);

	return new cSimpleQuantifiedBinding(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) : null, oExpr);
};

// sequence
function fParseIntersectExceptExpr(oLexer, oStaticContext) {
	var oExpr,
		sOperator;
	if (oLexer.eof() ||!(oExpr = fParseInstanceofExpr(oLexer, oStaticContext)))
		return;
	if (!((sOperator = oLexer.peek()) == "intersect" || sOperator == "except"))
		return oExpr;

	// IntersectExcept expression
	var oIntersectExceptExpr	= new cIntersectExceptExpr(oExpr);
	while ((sOperator = oLexer.peek()) == "intersect" || sOperator == "except") {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseInstanceofExpr(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected second operand in " + sOperator + " expression"
//<-Debug
			);
		oIntersectExceptExpr.items.push([sOperator, oExpr]);
	}
	return oIntersectExceptExpr;
};

function fParseRangeExpr(oLexer, oStaticContext) {
	var oExpr,
		oRight;
	if (oLexer.eof() ||!(oExpr = fParseAdditiveExpr(oLexer, oStaticContext)))
		return;
	if (oLexer.peek() != "to")
		return oExpr;

	// Range expression
	oLexer.next();
	if (oLexer.eof() ||!(oRight = fParseAdditiveExpr(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected second operand in range expression"
//<-Debug
		);
	return new cRangeExpr(oExpr, oRight);
};

function fParseUnionExpr(oLexer, oStaticContext) {
	var oExpr,
		sOperator;
	if (oLexer.eof() ||!(oExpr = fParseIntersectExceptExpr(oLexer, oStaticContext)))
		return;
	if (!((sOperator = oLexer.peek()) == '|' || sOperator == "union"))
		return oExpr;

	// Union expression
	var oUnionExpr	= new cUnionExpr(oExpr);
	while ((sOperator = oLexer.peek()) == '|' || sOperator == "union") {
		oLexer.next();
		if (oLexer.eof() ||!(oExpr = fParseIntersectExceptExpr(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected second operand in union expression"
//<-Debug
			);
		oUnionExpr.items.push(oExpr);
	}
	return oUnionExpr;
};

// type/types
function fParseAtomicType(oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().match(rNameTest);
	if (aMatch) {
		if (aMatch[1] == '*' || aMatch[2] == '*')
			throw new cException("XPST0003"
//->Debug
					, "Illegal use of wildcard in type name"
//<-Debug
			);
		oLexer.next();
		return new cAtomicType(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) : null);
	}
};

function fParseItemType(oLexer, oStaticContext) {
	if (oLexer.eof())
		return;

	var oExpr;
	if (oLexer.peek() == "item" && oLexer.peek(1) == '(') {
		oLexer.next(2);
		if (oLexer.peek() != ')')
			throw new cException("XPST0003"
//->Debug
					, "Expected ')' token in item type expression"
//<-Debug
			);
		oLexer.next();
		return new cItemType;
	}
	// Note! Following step should have been before previous as per spec
	if (oExpr = fParseKindTest(oLexer, oStaticContext))
		return new cItemType(oExpr);
	if (oExpr = fParseAtomicType(oLexer, oStaticContext))
		return new cItemType(oExpr);
};

function fParseSequenceType(oLexer, oStaticContext) {
	if (oLexer.eof())
		return;

	if (oLexer.peek() == "empty-sequence" && oLexer.peek(1) == '(') {
		oLexer.next(2);
		if (oLexer.peek() != ')')
			throw new cException("XPST0003"
//->Debug
					, "Expected ')' token in sequence type"
//<-Debug
			);
		oLexer.next();
		return new cSequenceType;	// empty sequence
	}

	var oExpr,
		sOccurence;
	if (!oLexer.eof() && (oExpr = fParseItemType(oLexer, oStaticContext))) {
		sOccurence	= oLexer.peek();
		if (sOccurence == '?' || sOccurence == '*' || sOccurence == '+')
			oLexer.next();
		else
			sOccurence	= null;

		return new cSequenceType(oExpr, sOccurence);
	}
};

function fParseSingleType(oLexer, oStaticContext) {
	var oExpr,
		sOccurence;
	if (!oLexer.eof() && (oExpr = fParseAtomicType(oLexer, oStaticContext))) {
		sOccurence	= oLexer.peek();
		if (sOccurence == '?')
			oLexer.next();
		else
			sOccurence	= null;

		return new cSingleType(oExpr, sOccurence);
	}
};

// type
function fParseCastableExpr(oLexer, oStaticContext) {
	var oExpr,
		oType;
	if (oLexer.eof() ||!(oExpr = fParseCastExpr(oLexer, oStaticContext)))
		return;

	if (!(oLexer.peek() == "castable" && oLexer.peek(1) == "as"))
		return oExpr;

	oLexer.next(2);
	if (oLexer.eof() ||!(oType = fParseSingleType(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected second operand in castable expression"
//<-Debug
		);

	return new cCastableExpr(oExpr, oType);
};

function fParseCastExpr(oLexer, oStaticContext) {
	var oExpr,
		oType;
	if (oLexer.eof() ||!(oExpr = fParseUnaryExpr(oLexer, oStaticContext)))
		return;

	if (!(oLexer.peek() == "cast" && oLexer.peek(1) == "as"))
		return oExpr;

	oLexer.next(2);
	if (oLexer.eof() ||!(oType = fParseSingleType(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected second operand in cast expression"
//<-Debug
		);

	return new cCastExpr(oExpr, oType);
};

function fParseInstanceofExpr(oLexer, oStaticContext) {
	var oExpr,
		oType;
	if (oLexer.eof() ||!(oExpr = fParseTreatExpr(oLexer, oStaticContext)))
		return;

	if (!(oLexer.peek() == "instance" && oLexer.peek(1) == "of"))
		return oExpr;

	oLexer.next(2);
	if (oLexer.eof() ||!(oType = fParseSequenceType(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected second operand in instance of expression"
//<-Debug
		);

	return new cInstanceofExpr(oExpr, oType);
};

function fParseTreatExpr(oLexer, oStaticContext) {
	var oExpr,
		oType;
	if (oLexer.eof() ||!(oExpr = fParseCastableExpr(oLexer, oStaticContext)))
		return;

	if (!(oLexer.peek() == "treat" && oLexer.peek(1) == "as"))
		return oExpr;

	oLexer.next(2);
	if (oLexer.eof() ||!(oType = fParseSequenceType(oLexer, oStaticContext)))
		throw new cException("XPST0003"
//->Debug
				, "Expected second operand in treat expression"
//<-Debug
		);

	return new cTreatExpr(oExpr, oType);
};

//
module.exports = fParseExpr;
