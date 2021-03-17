function cSingleType(oItemType, sOccurence) {
	this.itemType	= oItemType	|| null;
	this.occurence	= sOccurence|| null;
};

cSingleType.prototype.itemType	= null;
cSingleType.prototype.occurence	= null;

//
module.exports = cSingleType;
