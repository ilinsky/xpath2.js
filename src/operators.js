var fStaticContext_defineSystemOperator = require('./classes/StaticContext').defineSystemOperator;

var oBinary = require('./operators/binary');
var oBoolean = require('./operators/boolean');
var oDate = require('./operators/date');
var oNode = require('./operators/node');
var oNotation = require('./operators/notation');
var oNumeric = require('./operators/numeric');
var oQName = require('./operators/qname');
var oSequence = require('./operators/sequence');

// binary
fStaticContext_defineSystemOperator("hexBinary-equal", oBinary.fHexBinaryEqual);
fStaticContext_defineSystemOperator("base64Binary-equal", oBinary.fBase64BinaryEqual);
// boolean
fStaticContext_defineSystemOperator("boolean-equal", oBoolean.fBooleanEqual);
fStaticContext_defineSystemOperator("boolean-less-than", oBoolean.fBooleanLessThan);
fStaticContext_defineSystemOperator("boolean-greater-than", oBoolean.fBooleanGreaterThan);
// date
fStaticContext_defineSystemOperator("yearMonthDuration-less-than", oDate.fYearMonthDurationLessThan);
fStaticContext_defineSystemOperator("yearMonthDuration-greater-than", oDate.fYearMonthDurationGreaterThan);
fStaticContext_defineSystemOperator("dayTimeDuration-less-than", oDate.fDayTimeDurationLessThan);
fStaticContext_defineSystemOperator("dayTimeDuration-greater-than", oDate.fDayTimeDurationGreaterThan);
fStaticContext_defineSystemOperator("duration-equal", oDate.fDurationEqual);
fStaticContext_defineSystemOperator("dateTime-equal", oDate.fDateTimeEqual);
fStaticContext_defineSystemOperator("dateTime-less-than", oDate.fDateTimeLessThan);
fStaticContext_defineSystemOperator("dateTime-greater-than", oDate.fDateTimeGreaterThan);
fStaticContext_defineSystemOperator("date-equal", oDate.fDateEqual);
fStaticContext_defineSystemOperator("date-less-than", oDate.fDateLessThan);
fStaticContext_defineSystemOperator("date-greater-than", oDate.fDateGreaterThan);
fStaticContext_defineSystemOperator("time-equal", oDate.fTimeEqual);
fStaticContext_defineSystemOperator("time-less-than", oDate.fTimeLessThan);
fStaticContext_defineSystemOperator("time-greater-than", oDate.fTimeGreaterThan);
fStaticContext_defineSystemOperator("gYearMonth-equal", oDate.fGYearMonthEqual);
fStaticContext_defineSystemOperator("gYear-equal", oDate.fGYearEqual);
fStaticContext_defineSystemOperator("gMonthDay-equal", oDate.fGMonthDayEqual);
fStaticContext_defineSystemOperator("gMonth-equal", oDate.fGMonthEqual);
fStaticContext_defineSystemOperator("gDay-equal", oDate.fGDayEqual);
fStaticContext_defineSystemOperator("add-yearMonthDurations", oDate.fAddYearMonthDurations);
fStaticContext_defineSystemOperator("subtract-yearMonthDurations", oDate.fSubtractYearMonthDurations);
fStaticContext_defineSystemOperator("multiply-yearMonthDuration", oDate.fMultiplyYearMonthDuration);
fStaticContext_defineSystemOperator("divide-yearMonthDuration", oDate.fDivideYearMonthDuration);
fStaticContext_defineSystemOperator("divide-yearMonthDuration-by-yearMonthDuration", oDate.fDivideYearMonthDurationByYearMonthDuration);
fStaticContext_defineSystemOperator("add-dayTimeDurations", oDate.fAddDayTimeDurations);
fStaticContext_defineSystemOperator("subtract-dayTimeDurations", oDate.fSubtractDayTimeDurations);
fStaticContext_defineSystemOperator("multiply-dayTimeDuration", oDate.fMultiplyDayTimeDuration);
fStaticContext_defineSystemOperator("divide-dayTimeDuration", oDate.fDivideDayTimeDuration);
fStaticContext_defineSystemOperator("divide-dayTimeDuration-by-dayTimeDuration", oDate.fDivideDayTimeDurationByDayTimeDuration);
fStaticContext_defineSystemOperator("subtract-dateTimes", oDate.fSubtractDateTimes);
fStaticContext_defineSystemOperator("subtract-dates", oDate.fSubtractDates);
fStaticContext_defineSystemOperator("subtract-times", oDate.fSubtractTimes);
fStaticContext_defineSystemOperator("add-yearMonthDuration-to-dateTime", oDate.fAddYearMonthDurationToDateTime);
fStaticContext_defineSystemOperator("add-dayTimeDuration-to-dateTime", oDate.fAddDayTimeDurationToDateTime);
fStaticContext_defineSystemOperator("subtract-yearMonthDuration-from-dateTime", oDate.fSubtractYearMonthDurationToDateTime);
fStaticContext_defineSystemOperator("subtract-dayTimeDuration-from-dateTime", oDate.fSubtractDayTimeDurationToDateTime);
fStaticContext_defineSystemOperator("add-yearMonthDuration-to-date", oDate.fAddYearMonthDurationToDate);
fStaticContext_defineSystemOperator("add-dayTimeDuration-to-date", oDate.fAddDayTimeDurationToDate);
fStaticContext_defineSystemOperator("subtract-yearMonthDuration-from-date", oDate.fSubtractYearMonthDurationFromDate);
fStaticContext_defineSystemOperator("subtract-dayTimeDuration-from-date", oDate.fSubtractDayTimeDurationFromDate);
fStaticContext_defineSystemOperator("add-dayTimeDuration-to-time", oDate.fAddDayTimeDurationToTime);
fStaticContext_defineSystemOperator("subtract-dayTimeDuration-from-time", oDate.fSubtractDayTimeDurationFromTime);



// node
fStaticContext_defineSystemOperator("is-same-node", oNode.fIsSameNode);
fStaticContext_defineSystemOperator("node-before", oNode.fNodeBefore);
fStaticContext_defineSystemOperator("node-after", oNode.fNodeAfter);
// notation
fStaticContext_defineSystemOperator("NOTATION-equal", oNotation.fNotationEqual);
// numeric
fStaticContext_defineSystemOperator("numeric-add", oNumeric.fNumericAdd);
fStaticContext_defineSystemOperator("numeric-subtract", oNumeric.fNumericSubtract);
fStaticContext_defineSystemOperator("numeric-multiply", oNumeric.fNumericMultiply);
fStaticContext_defineSystemOperator("numeric-divide", oNumeric.fNumericDivide);
fStaticContext_defineSystemOperator("numeric-integer-divide", oNumeric.fNumericIntegerDivide);
fStaticContext_defineSystemOperator("numeric-mod", oNumeric.fNumericMod);
fStaticContext_defineSystemOperator("numeric-unary-plus", oNumeric.fNumericUnaryPlus);
fStaticContext_defineSystemOperator("numeric-unary-minus", oNumeric.fNumericUnaryMinus);
fStaticContext_defineSystemOperator("numeric-equal", oNumeric.fNumericEqual);
fStaticContext_defineSystemOperator("numeric-less-than", oNumeric.fNumericLessThan);
fStaticContext_defineSystemOperator("numeric-greater-than", oNumeric.fNumericGreaterThan);
// qname
fStaticContext_defineSystemOperator("QName-equal", oQName.fQNameEqual);
// sequence
fStaticContext_defineSystemOperator("concatenate", oSequence.fConcatenate);
fStaticContext_defineSystemOperator("union", oSequence.fUnion);
fStaticContext_defineSystemOperator("intersect", oSequence.fIntersect);
fStaticContext_defineSystemOperator("except", oSequence.fExcept);
fStaticContext_defineSystemOperator("to", oSequence.fTo);