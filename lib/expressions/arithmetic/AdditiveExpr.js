var cException = require('./../../classes/Exception');
var cSequence = require('./../../classes/Sequence');
var cStaticContext = require('./../../classes/StaticContext');

var cXSDate = require('./../../types/schema/simple/atomic/XSDate');
var cXSDouble = require('./../../types/schema/simple/atomic/XSDouble');
var cXSTime = require('./../../types/schema/simple/atomic/XSTime');
var cXSDateTime = require('./../../types/schema/simple/atomic/XSDateTime');
var cXSYearMonthDuration = require('./../../types/schema/simple/atomic/duration/XSYearMonthDuration');
var cXSDayTimeDuration = require('./../../types/schema/simple/atomic/duration/XSDayTimeDuration');
var cXSUntypedAtomic = require('./../../types/schema/simple/atomic/XSUntypedAtomic');
var cXSAnyAtomicType = require('./../../types/schema/simple/XSAnyAtomicType');

function cAdditiveExpr(oExpr) {
	this.left	= oExpr;
	this.items	= [];
};

cAdditiveExpr.prototype.left	= null;
cAdditiveExpr.prototype.items	= null;

//
cAdditiveExpr.operators	= {};
cAdditiveExpr.operators['+']	= function(oLeft, oRight, oContext) {
	var sOperator	= '',
		bReverse	= false;

	if (cXSAnyAtomicType.isNumeric(oLeft)) {
		if (cXSAnyAtomicType.isNumeric(oRight))
			sOperator	= "numeric-add";
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSYearMonthDuration)
			sOperator	= "add-yearMonthDuration-to-date";
		else
		if (oRight instanceof cXSDayTimeDuration)
			sOperator	= "add-dayTimeDuration-to-date";
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (oRight instanceof cXSDate) {
			sOperator	= "add-yearMonthDuration-to-date";
			bReverse	= true;
		}
		else
		if (oRight instanceof cXSDateTime) {
			sOperator	= "add-yearMonthDuration-to-dateTime";
			bReverse	= true;
		}
		else
		if (oRight instanceof cXSYearMonthDuration)
			sOperator	= "add-yearMonthDurations";
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (oRight instanceof cXSDate) {
			sOperator	= "add-dayTimeDuration-to-date";
			bReverse	= true;
		}
		else
		if (oRight instanceof cXSTime) {
			sOperator	= "add-dayTimeDuration-to-time";
			bReverse	= true;
		}
		else
		if (oRight instanceof cXSDateTime) {
			sOperator	= "add-dayTimeDuration-to-dateTime";
			bReverse	= true;
		}
		else
		if (oRight instanceof cXSDayTimeDuration)
			sOperator	= "add-dayTimeDurations";
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSDayTimeDuration)
			sOperator	= "add-dayTimeDuration-to-time";
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSYearMonthDuration)
			sOperator	= "add-yearMonthDuration-to-dateTime";
		else
		if (oRight instanceof cXSDayTimeDuration)
			sOperator	= "add-dayTimeDuration-to-dateTime";
	}

	// Call operator function
	if (sOperator)
		return cStaticContext.operators[sOperator].call(oContext, bReverse ? oRight : oLeft, bReverse ? oLeft : oRight);

	//
	throw new cException("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};
cAdditiveExpr.operators['-']	= function (oLeft, oRight, oContext) {
	var sOperator	= '';

	if (cXSAnyAtomicType.isNumeric(oLeft)) {
		if (cXSAnyAtomicType.isNumeric(oRight))
			sOperator	= "numeric-subtract";
	}
	else
	if (oLeft instanceof cXSDate) {
		if (oRight instanceof cXSDate)
			sOperator	= "subtract-dates";
		else
		if (oRight instanceof cXSYearMonthDuration)
			sOperator	= "subtract-yearMonthDuration-from-date";
		else
		if (oRight instanceof cXSDayTimeDuration)
			sOperator	= "subtract-dayTimeDuration-from-date";
	}
	else
	if (oLeft instanceof cXSTime) {
		if (oRight instanceof cXSTime)
			sOperator	= "subtract-times";
		else
		if (oRight instanceof cXSDayTimeDuration)
			sOperator	= "subtract-dayTimeDuration-from-time";
	}
	else
	if (oLeft instanceof cXSDateTime) {
		if (oRight instanceof cXSDateTime)
			sOperator	= "subtract-dateTimes";
		else
		if (oRight instanceof cXSYearMonthDuration)
			sOperator	= "subtract-yearMonthDuration-from-dateTime";
		else
		if (oRight instanceof cXSDayTimeDuration)
			sOperator	= "subtract-dayTimeDuration-from-dateTime";
	}
	else
	if (oLeft instanceof cXSYearMonthDuration) {
		if (oRight instanceof cXSYearMonthDuration)
			sOperator	= "subtract-yearMonthDurations";
	}
	else
	if (oLeft instanceof cXSDayTimeDuration) {
		if (oRight instanceof cXSDayTimeDuration)
			sOperator	= "subtract-dayTimeDurations";
	}

	// Call operator function
	if (sOperator)
		return cStaticContext.operators[sOperator].call(oContext, oLeft, oRight);

	//
	throw new cException("XPTY0004"
//->Debug
			, "Arithmetic operator is not defined for provided arguments"
//<-Debug
	);	// Arithmetic operator is not defined for arguments of types ({type1}, {type2})
};

// Public members
cAdditiveExpr.prototype.evaluate	= function (oContext) {
	var oLeft	= cSequence.atomize(this.left.evaluate(oContext), oContext);

	if (!oLeft.length)
		return [];
	// Assert cardinality

 	cSequence.assertSequenceCardinality(oLeft, oContext, '?'
//->Debug
 			, "first operand of '" + this.items[0][0] + "'"
//<-Debug
 	);

	var vLeft	= oLeft[0];
	if (vLeft instanceof cXSUntypedAtomic)
		vLeft	= cXSDouble.cast(vLeft);	// cast to xs:double

	for (var nIndex = 0, nLength = this.items.length, oRight, vRight; nIndex < nLength; nIndex++) {
		oRight	= cSequence.atomize(this.items[nIndex][1].evaluate(oContext), oContext);

		if (!oRight.length)
			return [];
		// Assert cardinality
 		cSequence.assertSequenceCardinality(oRight, oContext, '?'
//->Debug
 				, "first operand of '" + this.items[nIndex][0] + "'"
//<-Debug
 		);

		vRight	= oRight[0];
		if (vRight instanceof cXSUntypedAtomic)
			vRight	= cXSDouble.cast(vRight);	// cast to xs:double

		vLeft	= cAdditiveExpr.operators[this.items[nIndex][0]](vLeft, vRight, oContext);
	}
	return [vLeft];
};

//
module.exports = cAdditiveExpr;
