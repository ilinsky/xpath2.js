function cSimpleForBinding(sPrefix, sLocalName, sNameSpaceURI, oInExpr) {
	this.prefix = sPrefix;
	this.localName = sLocalName;
	this.namespaceURI = sNameSpaceURI;
	this.inExpr = oInExpr;
};

cSimpleForBinding.prototype.prefix = null;
cSimpleForBinding.prototype.localName = null;
cSimpleForBinding.prototype.namespaceURI = null;
cSimpleForBinding.prototype.inExpr = null;

//
module.exports = cSimpleForBinding;
