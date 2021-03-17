var cSequence = require('./../../classes/Sequence');

function cCastExpr(oExpr, oType) {
	this.expression	= oExpr;
	this.type		= oType;
};

cCastExpr.prototype.expression	= null;
cCastExpr.prototype.type		= null;

cCastExpr.prototype.evaluate	= function(oContext) {
	var oSequence1	= this.expression.evaluate(oContext);
	// Validate cardinality
 	cSequence.assertSequenceCardinality(oSequence1, oContext, this.type.occurence
//->Debug
 			, "'cast as' expression operand"
//<-Debug
 	);
	//
	if (!oSequence1.length)
		return [];
	//
	return [this.type.itemType.cast(cSequence.atomize(oSequence1, oContext)[0], oContext)];
};

//
module.exports = cCastExpr;
