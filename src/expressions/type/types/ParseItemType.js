
var cException = require('./../../../classes/Exception');
var cItemType = require('./../../type/types/ItemType');

var fParseKindTest = require('./../../path/tests/ParseKindTest');
var fParseAtomicType = require('./../../type/types/ParseAtomicType');

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

module.exports = fParseItemType;
