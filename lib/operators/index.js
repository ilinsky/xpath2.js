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
cStaticContext.defineSystemOperator("hexBinary-equal", oBinary.hexBinaryEqual);
cStaticContext.defineSystemOperator("base64Binary-equal", oBinary.base64BinaryEqual);
// boolean
cStaticContext.defineSystemOperator("boolean-equal", oBoolean.booleanEqual);
cStaticContext.defineSystemOperator("boolean-less-than", oBoolean.booleanLessThan);
cStaticContext.defineSystemOperator("boolean-greater-than", oBoolean.booleanGreaterThan);
// date
cStaticContext.defineSystemOperator("yearMonthDuration-less-than", oDate.yearMonthDurationLessThan);
cStaticContext.defineSystemOperator("yearMonthDuration-greater-than", oDate.yearMonthDurationGreaterThan);
cStaticContext.defineSystemOperator("dayTimeDuration-less-than", oDate.dayTimeDurationLessThan);
cStaticContext.defineSystemOperator("dayTimeDuration-greater-than", oDate.dayTimeDurationGreaterThan);
cStaticContext.defineSystemOperator("duration-equal", oDate.durationEqual);
cStaticContext.defineSystemOperator("dateTime-equal", oDate.dateTimeEqual);
cStaticContext.defineSystemOperator("dateTime-less-than", oDate.dateTimeLessThan);
cStaticContext.defineSystemOperator("dateTime-greater-than", oDate.dateTimeGreaterThan);
cStaticContext.defineSystemOperator("date-equal", oDate.dateEqual);
cStaticContext.defineSystemOperator("date-less-than", oDate.dateLessThan);
cStaticContext.defineSystemOperator("date-greater-than", oDate.dateGreaterThan);
cStaticContext.defineSystemOperator("time-equal", oDate.timeEqual);
cStaticContext.defineSystemOperator("time-less-than", oDate.timeLessThan);
cStaticContext.defineSystemOperator("time-greater-than", oDate.timeGreaterThan);
cStaticContext.defineSystemOperator("gYearMonth-equal", oDate.GYearMonthEqual);
cStaticContext.defineSystemOperator("gYear-equal", oDate.GYearEqual);
cStaticContext.defineSystemOperator("gMonthDay-equal", oDate.GMonthDayEqual);
cStaticContext.defineSystemOperator("gMonth-equal", oDate.GMonthEqual);
cStaticContext.defineSystemOperator("gDay-equal", oDate.GDayEqual);
cStaticContext.defineSystemOperator("add-yearMonthDurations", oDate.addYearMonthDurations);
cStaticContext.defineSystemOperator("subtract-yearMonthDurations", oDate.subtractYearMonthDurations);
cStaticContext.defineSystemOperator("multiply-yearMonthDuration", oDate.multiplyYearMonthDuration);
cStaticContext.defineSystemOperator("divide-yearMonthDuration", oDate.divideYearMonthDuration);
cStaticContext.defineSystemOperator("divide-yearMonthDuration-by-yearMonthDuration", oDate.divideYearMonthDurationByYearMonthDuration);
cStaticContext.defineSystemOperator("add-dayTimeDurations", oDate.addDayTimeDurations);
cStaticContext.defineSystemOperator("subtract-dayTimeDurations", oDate.subtractDayTimeDurations);
cStaticContext.defineSystemOperator("multiply-dayTimeDuration", oDate.multiplyDayTimeDuration);
cStaticContext.defineSystemOperator("divide-dayTimeDuration", oDate.divideDayTimeDuration);
cStaticContext.defineSystemOperator("divide-dayTimeDuration-by-dayTimeDuration", oDate.divideDayTimeDurationByDayTimeDuration);
cStaticContext.defineSystemOperator("subtract-dateTimes", oDate.subtractDateTimes);
cStaticContext.defineSystemOperator("subtract-dates", oDate.subtractDates);
cStaticContext.defineSystemOperator("subtract-times", oDate.subtractTimes);
cStaticContext.defineSystemOperator("add-yearMonthDuration-to-dateTime", oDate.addYearMonthDurationToDateTime);
cStaticContext.defineSystemOperator("add-dayTimeDuration-to-dateTime", oDate.addDayTimeDurationToDateTime);
cStaticContext.defineSystemOperator("subtract-yearMonthDuration-from-dateTime", oDate.subtractYearMonthDurationToDateTime);
cStaticContext.defineSystemOperator("subtract-dayTimeDuration-from-dateTime", oDate.subtractDayTimeDurationToDateTime);
cStaticContext.defineSystemOperator("add-yearMonthDuration-to-date", oDate.addYearMonthDurationToDate);
cStaticContext.defineSystemOperator("add-dayTimeDuration-to-date", oDate.addDayTimeDurationToDate);
cStaticContext.defineSystemOperator("subtract-yearMonthDuration-from-date", oDate.subtractYearMonthDurationFromDate);
cStaticContext.defineSystemOperator("subtract-dayTimeDuration-from-date", oDate.subtractDayTimeDurationFromDate);
cStaticContext.defineSystemOperator("add-dayTimeDuration-to-time", oDate.addDayTimeDurationToTime);
cStaticContext.defineSystemOperator("subtract-dayTimeDuration-from-time", oDate.subtractDayTimeDurationFromTime);



// node
cStaticContext.defineSystemOperator("is-same-node", oNode.isSameNode);
cStaticContext.defineSystemOperator("node-before", oNode.nodeBefore);
cStaticContext.defineSystemOperator("node-after", oNode.nodeAfter);
// notation
cStaticContext.defineSystemOperator("NOTATION-equal", oNotation.notationEqual);
// numeric
cStaticContext.defineSystemOperator("numeric-add", oNumeric.numericAdd);
cStaticContext.defineSystemOperator("numeric-subtract", oNumeric.numericSubtract);
cStaticContext.defineSystemOperator("numeric-multiply", oNumeric.numericMultiply);
cStaticContext.defineSystemOperator("numeric-divide", oNumeric.numericDivide);
cStaticContext.defineSystemOperator("numeric-integer-divide", oNumeric.numericIntegerDivide);
cStaticContext.defineSystemOperator("numeric-mod", oNumeric.numericMod);
cStaticContext.defineSystemOperator("numeric-unary-plus", oNumeric.numericUnaryPlus);
cStaticContext.defineSystemOperator("numeric-unary-minus", oNumeric.numericUnaryMinus);
cStaticContext.defineSystemOperator("numeric-equal", oNumeric.numericEqual);
cStaticContext.defineSystemOperator("numeric-less-than", oNumeric.numericLessThan);
cStaticContext.defineSystemOperator("numeric-greater-than", oNumeric.numericGreaterThan);
// qname
cStaticContext.defineSystemOperator("QName-equal", oQName.QNameEqual);
// sequence
cStaticContext.defineSystemOperator("concatenate", oSequence.concatenate);
cStaticContext.defineSystemOperator("union", oSequence.union);
cStaticContext.defineSystemOperator("intersect", oSequence.intersect);
cStaticContext.defineSystemOperator("except", oSequence.except);
cStaticContext.defineSystemOperator("to", oSequence.to);