var cAtomicType = require('./AtomicType');

var rNameTest	= /^(?:(?![0-9-])(\w[\w.-]*|\*)\:)?(?![0-9-])(\w[\w.-]*|\*)$/;

function fParseAtomicType(oLexer, oStaticContext) {
	var aMatch	= oLexer.peek().match(rNameTest);
	if (aMatch) {
		if (aMatch[1] == '*' || aMatch[2] == '*')
			throw new cException("XPST0003"
//->Debug
					, "Illegal use of wildcard in type name"
//<-Debug
			);
		oLexer.next();
		return new cAtomicType(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) : null);
	}
};

//
module.exports = fParseAtomicType;
