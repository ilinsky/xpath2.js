var cException = require('./../../classes/Exception');
var cSequence = require('./../../classes/Sequence');

var cXSBoolean = require('./../../types/schema/simple/atomic/XSBoolean');
//

function cCastableExpr(oExpr, oType) {
	this.expression	= oExpr;
	this.type		= oType;
};

cCastableExpr.prototype.expression	= null;
cCastableExpr.prototype.type		= null;

cCastableExpr.prototype.evaluate	= function(oContext) {
	var oSequence1	= this.expression.evaluate(oContext),
		oItemType	= this.type.itemType,
		sOccurence	= this.type.occurence;

	if (oSequence1.length > 1)
		return [new cXSBoolean(false)];
	else
	if (!oSequence1.length)
		return [new cXSBoolean(sOccurence == '?')];

	// Try casting
	try {
		oItemType.cast(cSequence.atomize(oSequence1, oContext)[0]);
	}
	catch (e) {
		if (!(e instanceof cException))
			throw e;
		if (e.code == "XPST0051")
			throw e;
		if (e.code == "XPST0017")
			throw new cException("XPST0080"
//->Debug
					, "No value is castable to " + (oItemType.prefix ? oItemType.prefix + ':' : '') + oItemType.localName
//<-Debug
			);
		//
		return [new cXSBoolean(false)];
	}

	return [new cXSBoolean(true)];
};

//
module.exports = cCastableExpr;
