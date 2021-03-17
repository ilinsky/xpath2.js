var cLexer = require('./Lexer');
var cException = require('./Exception');
var fParseExpr = require('./../expressions/ParseExpr');

function cExpression(sExpression, oStaticContext) {
	var oLexer	= new cLexer(sExpression),
		oExpr	= fParseExpr(oLexer, oStaticContext);
	//
	if (!oLexer.eof())
		throw new cException("XPST0003"
//->Debug
				, "Unexpected token beyond end of query"
//<-Debug
		);
	//
	if (!oExpr)
		throw new cException("XPST0003"
//->Debug
				, "Expected expression"
//<-Debug
		);
	this.internalExpression	= oExpr;
};

cExpression.prototype.internalExpression	= null;

// Public methods
cExpression.prototype.evaluate	= function(oContext) {
	return this.internalExpression.evaluate(oContext);
};

//
module.exports = cExpression;
