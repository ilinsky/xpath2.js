function cParenthesizedExpr(oExpr) {
	this.expression	= oExpr;
};

// Public members
cParenthesizedExpr.prototype.evaluate	= function (oContext) {
	return this.expression ? this.expression.evaluate(oContext) : [];
};

//
module.exports = cParenthesizedExpr;
