/*
 * XPath2.js - Pure JavaScript implementation of XPath 2.0 parser and evaluator
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 */

function cIfExpr(oCondExpr, oThenExpr, oElseExpr) {
	this.condExpr	= oCondExpr;
	this.thenExpr		= oThenExpr;
	this.elseExpr		= oElseExpr;
};

cIfExpr.prototype.ifExpr	= null;
cIfExpr.prototype.thenExpr	= null;
cIfExpr.prototype.elseExpr	= null;

// Static members
cIfExpr.parse	= function (oLexer) {
	var oCondExpr,
		oThenExpr,
		oElseExpr;
	if (oLexer.peek() == "if" && oLexer.peek(1) == "(") {
		oLexer.next();
		oLexer.next();
		//
		oCondExpr	= cExpr.parse(oLexer);
		//
		if (oLexer.peek() == ")") {
			oLexer.next();
			if (oLexer.peek() == "then") {
				oLexer.next();
				oThenExpr	= cExprSingle.parse(oLexer);
				if (oLexer.peek() == "else") {
					oLexer.next();
					oElseExpr	= cExprSingle.parse(oLexer);
					//
					return new cIfExpr(oCondExpr, oThenExpr, oElseExpr);
				}
				else {
					throw "IfExpr.parse: Expected 'else' token";
				}
			}
			else {
				throw "IfExpr.parse: Expected 'then' token";
			}
		}
		else {
			throw "IfExpr.parse: Expected ')' token";
		}
	}
};

// Public members
cIfExpr.prototype.evaluate	= function (oContext) {
	return this[this.condExpr.evaluate(oContext).toBoolean() ? "thenExpr" : "elseExpr"].evaluate(oContext);
};