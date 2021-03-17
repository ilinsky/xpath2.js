var cSequence = require('./../../classes/Sequence');

var cXSBoolean = require('./../../types/schema/simple/atomic/XSBoolean');

function cOrExpr(oExpr) {
	this.left	= oExpr;
	this.items	= [];
};

cOrExpr.prototype.left	= null;
cOrExpr.prototype.items	= null;

// Public members
cOrExpr.prototype.evaluate	= function (oContext) {
	var bValue	= cSequence.toEBV(this.left.evaluate(oContext), oContext);
	for (var nIndex = 0, nLength = this.items.length; (nIndex < nLength) && !bValue; nIndex++)
		bValue	= cSequence.toEBV(this.items[nIndex].evaluate(oContext), oContext);
	return [new cXSBoolean(bValue)];
};

//
module.exports = cOrExpr;
