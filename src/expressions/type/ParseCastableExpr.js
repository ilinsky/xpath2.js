var cCastableExpr = require('./../type/CastableExpr');

var fParseCastExpr = require('./../type/ParseCastExpr');
var fParseSingleType = require('./../type/types/ParseSingleType');

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

module.exports = fParseCastableExpr;
