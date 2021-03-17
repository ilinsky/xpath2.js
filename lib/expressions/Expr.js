var cStaticContext = require('./../classes/StaticContext');

function cExpr() {
	this.items	= [];
};

cExpr.prototype.items	= null;

// Public members
cExpr.prototype.evaluate	= function(oContext) {
	var oSequence	= [];
	for (var nIndex = 0, nLength = this.items.length; nIndex < nLength; nIndex++)
		oSequence	= cStaticContext.operators["concatenate"].call(oContext, oSequence, this.items[nIndex].evaluate(oContext));
	return oSequence;
};

//
module.exports = cExpr;
