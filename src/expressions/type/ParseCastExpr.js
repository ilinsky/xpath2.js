var cCastExpr = require('./CastExpr');

var fParseUnaryExpr = require('./../arithmetic/ParseUnaryExpr');
var fParseSingleType = require('./types/ParseSingleType');

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

//
module.exports = fParseCastExpr;
