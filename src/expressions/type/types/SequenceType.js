function cSequenceType(oItemType, sOccurence) {
	this.itemType	= oItemType	|| null;
	this.occurence	= sOccurence|| null;
};

cSequenceType.prototype.itemType	= null;
cSequenceType.prototype.occurence	= null;

//
module.exports = cSequenceType;
