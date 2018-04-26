var cNameTest = require('./NameTest');

var rNameTest	= /^(?:(?![0-9-])(\w[\w.-]*|\*)\:)?(?![0-9-])(\w[\w.-]*|\*)$/;

function fParse(oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().match(rNameTest);
	if (aMatch) {
		if (aMatch[1] == '*' && aMatch[2] == '*')
			throw new cException("XPST0003"
//->Debug
					, "Illegal use of *:* wildcard in name test"
//<-Debug
			);
		oLexer.next();
		return new cNameTest(aMatch[1] || null, aMatch[2], aMatch[1] ? aMatch[1] == '*' ? '*' : oStaticContext.getURIForPrefix(aMatch[1]) || null : oStaticContext.defaultElementNamespace);
	}
};

//
module.exports = fParse;
