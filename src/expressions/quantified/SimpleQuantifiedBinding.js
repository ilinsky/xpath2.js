//
function cSimpleQuantifiedBinding(sPrefix, sLocalName, sNameSpaceURI, oInExpr) {
	this.prefix			= sPrefix;
	this.localName		= sLocalName;
	this.namespaceURI	= sNameSpaceURI;
	this.inExpr		= oInExpr;
};

cSimpleQuantifiedBinding.prototype.prefix		= null;
cSimpleQuantifiedBinding.prototype.localName	= null;
cSimpleQuantifiedBinding.prototype.namespaceURI	= null;
cSimpleQuantifiedBinding.prototype.inExpr	= null;

module.exports = cSimpleQuantifiedBinding;