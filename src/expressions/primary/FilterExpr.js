var cStepExpr = require('./../path/StepExpr');

function cFilterExpr(oPrimary) {
	this.expression	= oPrimary;
	this.predicates	= [];
};

cFilterExpr.prototype	= new cStepExpr;
cFilterExpr.prototype.expression	= null;

// Public members
cFilterExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= this.expression.evaluate(oContext);
	if (this.predicates.length && oSequence.length)
		oSequence	= this.applyPredicates(oSequence, oContext);
	return oSequence;
};

//
module.exports = cFilterExpr;
