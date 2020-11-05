
var cKindTest = require('./KindTest');

// Static members
function fParseKindTest(oLexer, oStaticContext) {
	var sName	= oLexer.peek(),
		oValue;
	if (oLexer.peek(1) == '(') {
		//
		if (!(sName in cKindTest.names))
			throw new cException("XPST0003"
//->Debug
					, "Unknown '" + sName + "' kind test"
//<-Debug
			);

		//
		oLexer.next(2);
		//
		var oTest	= new cKindTest(sName);
		if (oLexer.peek() != ')') {
			if (sName == "document-node") {
				// TODO: parse test further
			}
			else
			if (sName == "element") {
				// TODO: parse test further
			}
			else
			if (sName == "attribute") {
				// TODO: parse test further
			}
			else
			if (sName == "processing-instruction") {
				oValue = fStringLiteralParse(oLexer, oStaticContext);
				if (!oValue) {
					oValue = new cStringLiteral(new cXSString(oLexer.peek()));
					oLexer.next();
				}
				oTest.args.push(oValue);
			}
			else
			if (sName == "schema-attribute") {
				// TODO: parse test further
			}
			else
			if (sName == "schema-element") {
				// TODO: parse test further
			}
		}
		else {
			if (sName == "schema-attribute")
				throw new cException("XPST0003"
//->Debug
						, "Expected attribute declaration in 'schema-attribute' kind test"
//<-Debug
				);
			else
			if (sName == "schema-element")
				throw new cException("XPST0003"
//->Debug
						, "Expected element declaration in 'schema-element' kind test"
//<-Debug
				);
		}

		if (oLexer.peek() != ')')
			throw new cException("XPST0003"
//->Debug
					, "Expected ')' token in kind test"
//<-Debug
			);
		oLexer.next();

		return oTest;
	}
};

//
module.exports = fParseKindTest;
