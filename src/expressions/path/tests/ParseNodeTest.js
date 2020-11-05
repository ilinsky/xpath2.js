var fParseKindTest = require('./ParseKindTest');
var fParseNameTest = require('./ParseNameTest');

// Static members
function fParseNodeTest(oLexer, oStaticContext) {
	if (!oLexer.eof())
		return fParseKindTest(oLexer, oStaticContext)
			|| fParseNameTest(oLexer, oStaticContext);
};

//
module.exports = fParseNodeTest;
