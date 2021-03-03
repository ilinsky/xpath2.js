 // FIXME: found in multiple places
var rNameTest	= /^(?:(?![0-9-])(\w[\w.-]*|\*)\:)?(?![0-9-])(\w[\w.-]*|\*)$/;

var cVarRef = require('./VarRef');

var cException = require('./../../classes/Exception');

function fParseVarRef(oLexer, oStaticContext) {
	if (oLexer.peek().substr(0, 1) == '$') {
		var aMatch	= oLexer.peek().substr(1).match(rNameTest);
		if (aMatch) {
			if (aMatch[1] == '*' || aMatch[2] == '*')
				throw new cException("XPST0003"
	//->Debug
						, "Illegal use of wildcard in var expression variable name"
	//<-Debug
				);

			var oVarRef	= new cVarRef(aMatch[1] || null, aMatch[2], aMatch[1] ? oStaticContext.getURIForPrefix(aMatch[1]) : null);
			oLexer.next();
			return oVarRef;
		}
	}
};

module.exports = fParseVarRef;
