var cTreatExpr = require('./../type/TreatExpr');

var fParseCastableExpr = require('./../type/ParseCastableExpr');
var fParseSequenceType = require('./../type/types/ParseSequenceType');

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

module.exports = fParseTreatExpr;
