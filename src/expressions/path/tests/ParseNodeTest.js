var fParseKindTest = require('./ParseKindTest');
var fParseNameTest = require('./ParseNameTest');

// Static members
function fParse(oLexer, oStaticContext) {
	if (!oLexer.eof())
		return fParseKindTest(oLexer, oStaticContext)
			|| fParseNameTest(oLexer, oStaticContext);
};

//
module.exports = fParse;
