var cStaticContext = require('./../classes/StaticContext');

var oBinary = require('./binary');
var oBoolean = require('./boolean');
var oDate = require('./date');
var oNode = require('./node');
var oNotation = require('./notation');
var oNumeric = require('./numeric');
var oQName = require('./qname');
var oSequence = require('./sequence');

// binary
cStaticContext.defineSystemOperator("hexBinary-equal", oBinary.fHexBinaryEqual);
cStaticContext.defineSystemOperator("base64Binary-equal", oBinary.fBase64BinaryEqual);
// boolean
cStaticContext.defineSystemOperator("boolean-equal", oBoolean.fBooleanEqual);
cStaticContext.defineSystemOperator("boolean-less-than", oBoolean.fBooleanLessThan);
cStaticContext.defineSystemOperator("boolean-greater-than", oBoolean.fBooleanGreaterThan);
// date
cStaticContext.defineSystemOperator("yearMonthDuration-less-than", oDate.fYearMonthDurationLessThan);
cStaticContext.defineSystemOperator("yearMonthDuration-greater-than", oDate.fYearMonthDurationGreaterThan);
cStaticContext.defineSystemOperator("dayTimeDuration-less-than", oDate.fDayTimeDurationLessThan);
cStaticContext.defineSystemOperator("dayTimeDuration-greater-than", oDate.fDayTimeDurationGreaterThan);
cStaticContext.defineSystemOperator("duration-equal", oDate.fDurationEqual);
cStaticContext.defineSystemOperator("dateTime-equal", oDate.fDateTimeEqual);
cStaticContext.defineSystemOperator("dateTime-less-than", oDate.fDateTimeLessThan);
cStaticContext.defineSystemOperator("dateTime-greater-than", oDate.fDateTimeGreaterThan);
cStaticContext.defineSystemOperator("date-equal", oDate.fDateEqual);
cStaticContext.defineSystemOperator("date-less-than", oDate.fDateLessThan);
cStaticContext.defineSystemOperator("date-greater-than", oDate.fDateGreaterThan);
cStaticContext.defineSystemOperator("time-equal", oDate.fTimeEqual);
cStaticContext.defineSystemOperator("time-less-than", oDate.fTimeLessThan);
cStaticContext.defineSystemOperator("time-greater-than", oDate.fTimeGreaterThan);
cStaticContext.defineSystemOperator("gYearMonth-equal", oDate.fGYearMonthEqual);
cStaticContext.defineSystemOperator("gYear-equal", oDate.fGYearEqual);
cStaticContext.defineSystemOperator("gMonthDay-equal", oDate.fGMonthDayEqual);
cStaticContext.defineSystemOperator("gMonth-equal", oDate.fGMonthEqual);
cStaticContext.defineSystemOperator("gDay-equal", oDate.fGDayEqual);
cStaticContext.defineSystemOperator("add-yearMonthDurations", oDate.fAddYearMonthDurations);
cStaticContext.defineSystemOperator("subtract-yearMonthDurations", oDate.fSubtractYearMonthDurations);
cStaticContext.defineSystemOperator("multiply-yearMonthDuration", oDate.fMultiplyYearMonthDuration);
cStaticContext.defineSystemOperator("divide-yearMonthDuration", oDate.fDivideYearMonthDuration);
cStaticContext.defineSystemOperator("divide-yearMonthDuration-by-yearMonthDuration", oDate.fDivideYearMonthDurationByYearMonthDuration);
cStaticContext.defineSystemOperator("add-dayTimeDurations", oDate.fAddDayTimeDurations);
cStaticContext.defineSystemOperator("subtract-dayTimeDurations", oDate.fSubtractDayTimeDurations);
cStaticContext.defineSystemOperator("multiply-dayTimeDuration", oDate.fMultiplyDayTimeDuration);
cStaticContext.defineSystemOperator("divide-dayTimeDuration", oDate.fDivideDayTimeDuration);
cStaticContext.defineSystemOperator("divide-dayTimeDuration-by-dayTimeDuration", oDate.fDivideDayTimeDurationByDayTimeDuration);
cStaticContext.defineSystemOperator("subtract-dateTimes", oDate.fSubtractDateTimes);
cStaticContext.defineSystemOperator("subtract-dates", oDate.fSubtractDates);
cStaticContext.defineSystemOperator("subtract-times", oDate.fSubtractTimes);
cStaticContext.defineSystemOperator("add-yearMonthDuration-to-dateTime", oDate.fAddYearMonthDurationToDateTime);
cStaticContext.defineSystemOperator("add-dayTimeDuration-to-dateTime", oDate.fAddDayTimeDurationToDateTime);
cStaticContext.defineSystemOperator("subtract-yearMonthDuration-from-dateTime", oDate.fSubtractYearMonthDurationToDateTime);
cStaticContext.defineSystemOperator("subtract-dayTimeDuration-from-dateTime", oDate.fSubtractDayTimeDurationToDateTime);
cStaticContext.defineSystemOperator("add-yearMonthDuration-to-date", oDate.fAddYearMonthDurationToDate);
cStaticContext.defineSystemOperator("add-dayTimeDuration-to-date", oDate.fAddDayTimeDurationToDate);
cStaticContext.defineSystemOperator("subtract-yearMonthDuration-from-date", oDate.fSubtractYearMonthDurationFromDate);
cStaticContext.defineSystemOperator("subtract-dayTimeDuration-from-date", oDate.fSubtractDayTimeDurationFromDate);
cStaticContext.defineSystemOperator("add-dayTimeDuration-to-time", oDate.fAddDayTimeDurationToTime);
cStaticContext.defineSystemOperator("subtract-dayTimeDuration-from-time", oDate.fSubtractDayTimeDurationFromTime);



// node
cStaticContext.defineSystemOperator("is-same-node", oNode.fIsSameNode);
cStaticContext.defineSystemOperator("node-before", oNode.fNodeBefore);
cStaticContext.defineSystemOperator("node-after", oNode.fNodeAfter);
// notation
cStaticContext.defineSystemOperator("NOTATION-equal", oNotation.fNotationEqual);
// numeric
cStaticContext.defineSystemOperator("numeric-add", oNumeric.fNumericAdd);
cStaticContext.defineSystemOperator("numeric-subtract", oNumeric.fNumericSubtract);
cStaticContext.defineSystemOperator("numeric-multiply", oNumeric.fNumericMultiply);
cStaticContext.defineSystemOperator("numeric-divide", oNumeric.fNumericDivide);
cStaticContext.defineSystemOperator("numeric-integer-divide", oNumeric.fNumericIntegerDivide);
cStaticContext.defineSystemOperator("numeric-mod", oNumeric.fNumericMod);
cStaticContext.defineSystemOperator("numeric-unary-plus", oNumeric.fNumericUnaryPlus);
cStaticContext.defineSystemOperator("numeric-unary-minus", oNumeric.fNumericUnaryMinus);
cStaticContext.defineSystemOperator("numeric-equal", oNumeric.fNumericEqual);
cStaticContext.defineSystemOperator("numeric-less-than", oNumeric.fNumericLessThan);
cStaticContext.defineSystemOperator("numeric-greater-than", oNumeric.fNumericGreaterThan);
// qname
cStaticContext.defineSystemOperator("QName-equal", oQName.fQNameEqual);
// sequence
cStaticContext.defineSystemOperator("concatenate", oSequence.fConcatenate);
cStaticContext.defineSystemOperator("union", oSequence.fUnion);
cStaticContext.defineSystemOperator("intersect", oSequence.fIntersect);
cStaticContext.defineSystemOperator("except", oSequence.fExcept);
cStaticContext.defineSystemOperator("to", oSequence.fTo);