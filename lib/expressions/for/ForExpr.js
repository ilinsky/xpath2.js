function cForExpr() {
	this.bindings	= [];
	this.returnExpr	= null;
};

cForExpr.prototype.bindings		= null;
cForExpr.prototype.returnExpr	= null;

// Public members
// for $x in X, $y in Y, $z in Z return $x + $y + $z
// for $x in X return for $y in Y return for $z in Z return $x + $y + $z
cForExpr.prototype.evaluate	= function (oContext) {
	var oSequence	= [];
	(function(oSelf, nBinding) {
		var oBinding	= oSelf.bindings[nBinding++],
			oSequence1	= oBinding.inExpr.evaluate(oContext),
			sUri	= (oBinding.namespaceURI ? '{' + oBinding.namespaceURI + '}' : '') + oBinding.localName;
		for (var nIndex = 0, nLength = oSequence1.length; nIndex < nLength; nIndex++) {
			oContext.pushVariable(sUri, oSequence1[nIndex]);
			if (nBinding < oSelf.bindings.length)
				arguments.callee(oSelf, nBinding);
			else
				oSequence	= oSequence.concat(oSelf.returnExpr.evaluate(oContext));
			oContext.popVariable(sUri);
		}
	})(this, 0);

	return oSequence;
};

//
module.exports = cForExpr;
