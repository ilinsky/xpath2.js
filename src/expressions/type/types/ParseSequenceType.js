var cSequenceType = require('./SequenceType');

var fParseItemType = require('./ParseItemType');

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

module.exports = fParseSequenceType;
