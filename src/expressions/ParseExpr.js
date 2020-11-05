var fParseExprSingle = require('./ParseExprSingle');

var cExpr = require('./Expr');
var cException = require('./../classes/Exception');

// Static members
function fParseExpr(oLexer, oStaticContext) {
	var oItem;
	if (oLexer.eof() ||!(oItem = fParseExprSingle(oLexer, oStaticContext)))
		return;

	// Create expression
	var oExpr	= new cExpr;
	oExpr.items.push(oItem);
	while (oLexer.peek() == ',') {
		oLexer.next();
		if (oLexer.eof() ||!(oItem = fParseExprSingle(oLexer, oStaticContext)))
			throw new cException("XPST0003"
//->Debug
					, "Expected expression"
//<-Debug
			);
		oExpr.items.push(oItem);
	}
	return oExpr;
};

//
module.exports = fParseExpr;
