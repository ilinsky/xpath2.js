var cStaticContext = require('./../classes/StaticContext');

var oAccessor = require('./accessor');
var oAnyuri = require('./anyuri');
var oBoolean = require('./boolean');
var oContext = require('./context');
var oDate = require('./date');
var oNode = require('./node');
var oNumeric = require('./numeric');
var oQName = require('./qname');
var oSequence = require('./sequence');
var oString = require('./string');
var oTrace = require('./trace');

var cXSAnyAtomicType = require('./../types/schema/simple/XSAnyAtomicType');
var cXSString = require('./../types/schema/simple/atomic/XSString');
var cXSDate = require('./../types/schema/simple/atomic/XSDate');
var cXSTime = require('./../types/schema/simple/atomic/XSTime');
var cXSDateTime = require('./../types/schema/simple/atomic/XSDateTime');
var cXSDuration = require('./../types/schema/simple/atomic/XSDuration');
var cXSDayTimeDuration = require('./../types/schema/simple/atomic/duration/XSDayTimeDuration');
var cXSQName = require('./../types/schema/simple/atomic/XSQName');
var cXSDouble = require('./../types/schema/simple/atomic/XSDouble');
var cXSInteger = require('./../types/schema/simple/atomic/integer/XSInteger');

var cXTItem = require('./../types/xpath/XTItem');
var cXTNode = require('./../types/xpath/XTNode');
var cXTElement = require('./../types/xpath/node/XTElement');

// Accessor
cStaticContext.defineSystemFunction("node-name", [[cXTNode, '?']], oAccessor.nodeName);
cStaticContext.defineSystemFunction("nilled", [[cXTNode, '?']], oAccessor.nilled);
cStaticContext.defineSystemFunction("string", [[cXTItem, '?', true]], oAccessor.string);
cStaticContext.defineSystemFunction("data", [[cXTItem, '*']], oAccessor.data);
cStaticContext.defineSystemFunction("base-uri", [[cXTNode, '?', true]], oAccessor.baseUri);
cStaticContext.defineSystemFunction("document-uri", [[cXTNode, '?']], oAccessor.documentUri);
// Anyuri
cStaticContext.defineSystemFunction("resolve-uri", [[cXSString, '?'], [cXSString, '', true]], oAnyuri.resolveUri);
// Boolean
cStaticContext.defineSystemFunction("true", [], oBoolean.true);
cStaticContext.defineSystemFunction("false", [], oBoolean.false);
cStaticContext.defineSystemFunction("not", [[cXTItem, '*']], oBoolean.not);
// Context
cStaticContext.defineSystemFunction("position", [], oContext.position);
cStaticContext.defineSystemFunction("last", [], oContext.last);
cStaticContext.defineSystemFunction("current-dateTime", [],  oContext.currentDateTime);
cStaticContext.defineSystemFunction("current-date", [], oContext.currentDate);
cStaticContext.defineSystemFunction("current-time", [], oContext.currentTime);
cStaticContext.defineSystemFunction("implicit-timezone", [], oContext.implicitTimezone);
cStaticContext.defineSystemFunction("default-collation", [],  oContext.defaultCollation);
cStaticContext.defineSystemFunction("static-base-uri", [], oContext.staticBaseUri);
// Date
cStaticContext.defineSystemFunction("years-from-duration", [[cXSDuration, '?']], oDate.yearsFromDuration);
cStaticContext.defineSystemFunction("months-from-duration", [[cXSDuration, '?']], oDate.monthsFromDuration);
cStaticContext.defineSystemFunction("days-from-duration", [[cXSDuration, '?']], oDate.daysFromDuration);
cStaticContext.defineSystemFunction("hours-from-duration", [[cXSDuration, '?']], oDate.hoursFromDuration);
cStaticContext.defineSystemFunction("minutes-from-duration", [[cXSDuration, '?']], oDate.minutesFromDuration);
cStaticContext.defineSystemFunction("seconds-from-duration", [[cXSDuration, '?']], oDate.secondsFromDuration);
cStaticContext.defineSystemFunction("year-from-dateTime", [[cXSDateTime, '?']], oDate.yearFromDateTime);
cStaticContext.defineSystemFunction("month-from-dateTime", [[cXSDateTime, '?']], oDate.monthFromDateTime);
cStaticContext.defineSystemFunction("day-from-dateTime", [[cXSDateTime, '?']], oDate.dayFromDateTime);
cStaticContext.defineSystemFunction("hours-from-dateTime", [[cXSDateTime, '?']], oDate.hoursFromDateTime);
cStaticContext.defineSystemFunction("minutes-from-dateTime", [[cXSDateTime, '?']], oDate.minutesFromDateTime);
cStaticContext.defineSystemFunction("seconds-from-dateTime", [[cXSDateTime, '?']], oDate.secondsFromDateTime);
cStaticContext.defineSystemFunction("timezone-from-dateTime", [[cXSDateTime, '?']], oDate.timezoneFromDateTime);
cStaticContext.defineSystemFunction("year-from-date", [[cXSDate, '?']], oDate.yearFromDate);
cStaticContext.defineSystemFunction("month-from-date", [[cXSDate, '?']], oDate.monthFromDate);
cStaticContext.defineSystemFunction("day-from-date", [[cXSDate, '?']], oDate.dayFromDate);
cStaticContext.defineSystemFunction("timezone-from-date", [[cXSDate, '?']], oDate.timezoneFromDate);
cStaticContext.defineSystemFunction("hours-from-time", [[cXSTime, '?']], oDate.hoursFromTime);
cStaticContext.defineSystemFunction("minutes-from-time", [[cXSTime, '?']], oDate.minutesFromTime);
cStaticContext.defineSystemFunction("seconds-from-time", [[cXSTime, '?']], oDate.secondsFromTime);
cStaticContext.defineSystemFunction("timezone-from-time", [[cXSTime, '?']], oDate.timezoneFromTime);
cStaticContext.defineSystemFunction("adjust-dateTime-to-timezone", [[cXSDateTime, '?'], [cXSDayTimeDuration, '?', true]], oDate.adjustDateTimeToTimezone);
cStaticContext.defineSystemFunction("adjust-date-to-timezone", [[cXSDate, '?'], [cXSDayTimeDuration, '?', true]], oDate.adjustDateToTimezone);
cStaticContext.defineSystemFunction("adjust-time-to-timezone", [[cXSTime, '?'], [cXSDayTimeDuration, '?', true]], oDate.adjustTimeToTimezone);
// node
cStaticContext.defineSystemFunction("name", [[cXTNode, '?', true]], oNode.name);
cStaticContext.defineSystemFunction("local-name", [[cXTNode, '?', true]], oNode.localName);
cStaticContext.defineSystemFunction("namespace-uri", [[cXTNode, '?', true]], oNode.namespaceUri);
cStaticContext.defineSystemFunction("number", [[cXSAnyAtomicType, '?', true]], oNode.number);
cStaticContext.defineSystemFunction("lang", [[cXSString, '?'], [cXTNode, '', true]], oNode.lang);
cStaticContext.defineSystemFunction("root", [[cXTNode, '?', true]], oNode.root);
// numeric
cStaticContext.defineSystemFunction("abs", [[cXSDouble, '?']], oNumeric.abs);
cStaticContext.defineSystemFunction("ceiling", [[cXSDouble, '?']], oNumeric.ceiling);
cStaticContext.defineSystemFunction("floor", [[cXSDouble, '?']], oNumeric.floor);
cStaticContext.defineSystemFunction("round", [[cXSDouble, '?']], oNumeric.round);
cStaticContext.defineSystemFunction("round-half-to-even", [[cXSDouble, '?'], [cXSInteger, '', true]], oNumeric.roundHalfToEven);
// qname
cStaticContext.defineSystemFunction("resolve-QName", [[cXSString, '?'], [cXTElement]], oQName.resolveQName);
cStaticContext.defineSystemFunction("QName", [[cXSString, '?'], [cXSString]], oQName.QName);
cStaticContext.defineSystemFunction("prefix-from-QName", [[cXSQName, '?']], oQName.prefixFromQName);
cStaticContext.defineSystemFunction("local-name-from-QName", [[cXSQName, '?']], oQName.localNameFromQName);
cStaticContext.defineSystemFunction("namespace-uri-from-QName", [[cXSQName, '?']], oQName.namespaceUriFromQName);
cStaticContext.defineSystemFunction("namespace-uri-for-prefix", [[cXSString, '?'], [cXTElement]], oQName.namespaceUriForPrefix);
cStaticContext.defineSystemFunction("in-scope-prefixes", [[cXTElement]], oQName.inScopePrefixes);
// sequence
cStaticContext.defineSystemFunction("boolean", [[cXTItem, '*']], oSequence.boolean);
cStaticContext.defineSystemFunction("index-of", [[cXSAnyAtomicType, '*'], [cXSAnyAtomicType], [cXSString, '', true]], oSequence.indexOf);
cStaticContext.defineSystemFunction("empty", [[cXTItem, '*']], oSequence.empty);
cStaticContext.defineSystemFunction("exists", [[cXTItem, '*']], oSequence.exists);
cStaticContext.defineSystemFunction("distinct-values", [[cXSAnyAtomicType, '*'], [cXSString, '', true]], oSequence.distinctValues);
cStaticContext.defineSystemFunction("insert-before", [[cXTItem, '*'], [cXSInteger], [cXTItem, '*']], oSequence.insertBefore);
cStaticContext.defineSystemFunction("remove", [[cXTItem, '*'], [cXSInteger]], oSequence.remove);
cStaticContext.defineSystemFunction("reverse", [[cXTItem, '*']], oSequence.reverse);
cStaticContext.defineSystemFunction("subsequence", [[cXTItem, '*'], [cXSDouble, ''], [cXSDouble, '', true]], oSequence.subsequence);
cStaticContext.defineSystemFunction("unordered", [[cXTItem, '*']], oSequence.unordered);
cStaticContext.defineSystemFunction("zero-or-one", [[cXTItem, '*']], oSequence.zeroOrOne);
cStaticContext.defineSystemFunction("one-or-more", [[cXTItem, '*']], oSequence.oneOrMore);
cStaticContext.defineSystemFunction("exactly-one", [[cXTItem, '*']], oSequence.exactlyOne);
cStaticContext.defineSystemFunction("deep-equal", [[cXTItem, '*'], [cXTItem, '*'], [cXSString, '', true]], oSequence.deepEqual);
cStaticContext.defineSystemFunction("count", [[cXTItem, '*']], oSequence.count);
cStaticContext.defineSystemFunction("avg", [[cXSAnyAtomicType, '*']], oSequence.avg);
cStaticContext.defineSystemFunction("max", [[cXSAnyAtomicType, '*'], [cXSString, '', true]], oSequence.max);
cStaticContext.defineSystemFunction("min", [[cXSAnyAtomicType, '*'], [cXSString, '', true]], oSequence.min);
cStaticContext.defineSystemFunction("sum", [[cXSAnyAtomicType, '*'], [cXSAnyAtomicType, '?', true]], oSequence.sum);
cStaticContext.defineSystemFunction("id", [[cXSString, '*'], [cXTNode, '', true]], oSequence.id);
cStaticContext.defineSystemFunction("idref", [[cXSString, '*'], [cXTNode, '', true]], oSequence.idref);
cStaticContext.defineSystemFunction("doc", [[cXSString, '?', true]], oSequence.doc);
cStaticContext.defineSystemFunction("doc-available", [[cXSString, '?', true]], oSequence.docAvailable);
cStaticContext.defineSystemFunction("collection", [[cXSString, '?', true]], oSequence.collection);
cStaticContext.defineSystemFunction("element-with-id", [[cXSString, '*'], [cXTNode, '', true]], oSequence.elementWithId);
// string
cStaticContext.defineSystemFunction("codepoints-to-string", [[cXSInteger, '*']], oString.codepointsToString);
cStaticContext.defineSystemFunction("string-to-codepoints", [[cXSString, '?']], oString.stringToCodepoints);
cStaticContext.defineSystemFunction("compare", [[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]], oString.compare);
cStaticContext.defineSystemFunction("codepoint-equal", [[cXSString, '?'], [cXSString, '?']], oString.codepointEqual);
cStaticContext.defineSystemFunction("concat", null, oString.concat);
cStaticContext.defineSystemFunction("string-join", [[cXSString, '*'], [cXSString]], oString.stringJoin);
cStaticContext.defineSystemFunction("substring", [[cXSString, '?'], [cXSDouble], [cXSDouble, '', true]], oString.substring);
cStaticContext.defineSystemFunction("string-length", [[cXSString, '?', true]], oString.stringLength);
cStaticContext.defineSystemFunction("normalize-space", [[cXSString, '?', true]], oString.normalizeSpace);
cStaticContext.defineSystemFunction("normalize-unicode", [[cXSString, '?'], [cXSString, '', true]], oString.normalizeUnicode);
cStaticContext.defineSystemFunction("upper-case", [[cXSString, '?']], oString.upperCase);
cStaticContext.defineSystemFunction("lower-case", [[cXSString, '?']], oString.lowerCase);
cStaticContext.defineSystemFunction("translate", [[cXSString, '?'], [cXSString], [cXSString]], oString.translate);
cStaticContext.defineSystemFunction("encode-for-uri", [[cXSString, '?']], oString.encodeForUri);
cStaticContext.defineSystemFunction("iri-to-uri", [[cXSString, '?']], oString.iriToUri);
cStaticContext.defineSystemFunction("escape-html-uri", [[cXSString, '?']], oString.escapeHtmlUri);
cStaticContext.defineSystemFunction("contains", [[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]], oString.contains);
cStaticContext.defineSystemFunction("starts-with", [[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]], oString.startsWith);
cStaticContext.defineSystemFunction("ends-with", [[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]], oString.endsWith);
cStaticContext.defineSystemFunction("substring-before", [[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]], oString.substringBefore);
cStaticContext.defineSystemFunction("substring-after", [[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]], oString.substringAfter);
cStaticContext.defineSystemFunction("matches", [[cXSString, '?'], [cXSString], [cXSString, '', true]], oString.matches);
cStaticContext.defineSystemFunction("replace", [[cXSString, '?'], [cXSString],  [cXSString], [cXSString, '', true]], oString.replace);
cStaticContext.defineSystemFunction("tokenize", [[cXSString, '?'], [cXSString], [cXSString, '', true]], oString.tokenize);
// trace
cStaticContext.defineSystemFunction("trace", [[cXTItem, '*'], [cXSString]], oTrace.trace);