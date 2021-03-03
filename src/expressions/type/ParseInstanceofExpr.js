var cInstanceofExpr = require('./../type/InstanceofExpr');

var fParseTreatExpr = require('./../type/ParseTreatExpr');
var fParseSequenceType = require('./../type/types/ParseSequenceType');

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

module.exports = fParseInstanceofExpr;
