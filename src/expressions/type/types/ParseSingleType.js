var cSingleType = require('./SingleType');

var fParseAtomicType = require('./ParseAtomicType');

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

//
module.exports = fParseSingleType;
