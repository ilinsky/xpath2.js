var cStaticContext = require('./../../classes/StaticContext');

function cIntersectExceptExpr(oExpr) {
	this.left	= oExpr;
	this.items	= [];
};

cIntersectExceptExpr.prototype.left		= null;
cIntersectExceptExpr.prototype.items	= null;

// Public members
cIntersectExceptExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= this.left.evaluate(oContext);
	for (var nIndex = 0, nLength = this.items.length, oItem; nIndex < nLength; nIndex++)
		oSequence	= cStaticContext.operators[(oItem = this.items[nIndex])[0]].call(oContext, oSequence, oItem[1].evaluate(oContext));
	return oSequence;
};

//
module.exports = cIntersectExceptExpr;
