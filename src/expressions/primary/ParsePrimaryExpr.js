/*
 * XPath.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2016 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

var cContextItemExpr = require('./ContextItemExpr');
var fParseParenthesizedExpr = require('./ParseParenthesizedExpr');
var fParseFunctionCall = require('./ParseFunctionCall');
var cVarRef = require('./VarRef');
var fParseLiteral = require('./ParseLiteral');

// Static members
function fParsePrimaryExpr(oLexer, oStaticContext) {
	if (!oLexer.eof())
		return cContextItemExpr.parse(oLexer, oStaticContext)
			|| fParseParenthesizedExpr(oLexer, oStaticContext)
			|| fParseFunctionCall(oLexer, oStaticContext)
			|| cVarRef.parse(oLexer, oStaticContext)
			|| fParseLiteral(oLexer, oStaticContext);
};

//
module.exports = fParsePrimaryExpr;
