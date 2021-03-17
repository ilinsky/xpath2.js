function cLiteral() {

};

cLiteral.prototype.value	= null;

// Public members
cLiteral.prototype.evaluate	= function (oContext) {
	return [this.value];
};

//
module.exports = cLiteral;
