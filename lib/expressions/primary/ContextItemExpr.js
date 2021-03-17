var cException = require('./../../classes/Exception');

function cContextItemExpr() {

};

// Public members
cContextItemExpr.prototype.evaluate	= function (oContext) {
	if (oContext.item == null)
		throw new cException("XPDY0002"
//->Debug
				, "Dynamic context does not have context item initialized"
//<-Debug
		);
	//
	return [oContext.item];
};

//
module.exports = cContextItemExpr;
