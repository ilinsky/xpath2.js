var cContextItemExpr = require('./ContextItemExpr');

// Static members
function fParseContextItemExpr(oLexer, oStaticContext) {
	if (oLexer.peek() == '.') {
		oLexer.next();
		return new cContextItemExpr;
	}
};

module.exports = fParseContextItemExpr;