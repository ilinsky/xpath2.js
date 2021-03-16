var cStaticContext = require('./classes/StaticContext');

var oAccessor = require('./functions/accessor');
var oAnyuri = require('./functions/anyuri');
var oBoolean = require('./functions/boolean');
var oContext = require('./functions/context');
var oDate = require('./functions/date');
var oNode = require('./functions/node');
var oNumeric = require('./functions/numeric');
var oQName = require('./functions/qname');
var oSequence = require('./functions/sequence');
var oString = require('./functions/string');
var oTrace = require('./functions/trace');

var cXSAnyAtomicType = require('./types/schema/simple/XSAnyAtomicType');
var cXSString = require('./types/schema/simple/atomic/XSString');
var cXSDate = require('./types/schema/simple/atomic/XSDate');
var cXSTime = require('./types/schema/simple/atomic/XSTime');
var cXSDateTime = require('./types/schema/simple/atomic/XSDateTime');
var cXSDuration = require('./types/schema/simple/atomic/XSDuration');
var cXSDayTimeDuration = require('./types/schema/simple/atomic/duration/XSDayTimeDuration');
var cXSQName = require('./types/schema/simple/atomic/XSQName');
var cXSDouble = require('./types/schema/simple/atomic/XSDouble');
var cXSInteger = require('./types/schema/simple/atomic/integer/XSInteger');

var cXTItem = require('./types/xpath/XTItem');
var cXTNode = require('./types/xpath/XTNode');
var cXTElement = require('./types/xpath/node/XTElement');

// Accessor
cStaticContext.defineSystemFunction("node-name", [[cXTNode, '?']], oAccessor.fNodeName);
cStaticContext.defineSystemFunction("nilled", [[cXTNode, '?']], oAccessor.fNilled);
cStaticContext.defineSystemFunction("string", [[cXTItem, '?', true]], oAccessor.fString);
cStaticContext.defineSystemFunction("data", [[cXTItem, '*']], oAccessor.fData);
cStaticContext.defineSystemFunction("base-uri", [[cXTNode, '?', true]], oAccessor.fBaseUri);
cStaticContext.defineSystemFunction("document-uri", [[cXTNode, '?']], oAccessor.fDocumentUri);
// Anyuri
cStaticContext.defineSystemFunction("resolve-uri", [[cXSString, '?'], [cXSString, '', true]], oAnyuri.fResolveUri);
// Boolean
cStaticContext.defineSystemFunction("true", [], oBoolean.fTrue);
cStaticContext.defineSystemFunction("false", [], oBoolean.fFalse);
cStaticContext.defineSystemFunction("not", [[cXTItem, '*']], oBoolean.fNot);
// Context
cStaticContext.defineSystemFunction("position", [], oContext.fPosition);
cStaticContext.defineSystemFunction("last", [], oContext.fLast);
cStaticContext.defineSystemFunction("current-dateTime", [],  oContext.fCurrentDateTime);
cStaticContext.defineSystemFunction("current-date", [], oContext.fCurrentDate);
cStaticContext.defineSystemFunction("current-time", [], oContext.fCurrentTime);
cStaticContext.defineSystemFunction("implicit-timezone", [], oContext.fImplicitTimezone);
cStaticContext.defineSystemFunction("default-collation", [],  oContext.fDefaultCollation);
cStaticContext.defineSystemFunction("static-base-uri", [], oContext.fStaticBaseUri);
// Date
cStaticContext.defineSystemFunction("years-from-duration", [[cXSDuration, '?']], oDate.fYearsFromDuration);
cStaticContext.defineSystemFunction("months-from-duration", [[cXSDuration, '?']], oDate.fMonthsFromDuration);
cStaticContext.defineSystemFunction("days-from-duration", [[cXSDuration, '?']], oDate.fDaysFromDuration);
cStaticContext.defineSystemFunction("hours-from-duration", [[cXSDuration, '?']], oDate.fHoursFromDuration);
cStaticContext.defineSystemFunction("minutes-from-duration", [[cXSDuration, '?']], oDate.fMinutesFromDuration);
cStaticContext.defineSystemFunction("seconds-from-duration", [[cXSDuration, '?']], oDate.fSecondsFromDuration);
cStaticContext.defineSystemFunction("year-from-dateTime", [[cXSDateTime, '?']], oDate.fYearFromDateTime);
cStaticContext.defineSystemFunction("month-from-dateTime", [[cXSDateTime, '?']], oDate.fMonthFromDateTime);
cStaticContext.defineSystemFunction("day-from-dateTime", [[cXSDateTime, '?']], oDate.fDayFromDateTime);
cStaticContext.defineSystemFunction("hours-from-dateTime", [[cXSDateTime, '?']], oDate.fHoursFromDateTime);
cStaticContext.defineSystemFunction("minutes-from-dateTime", [[cXSDateTime, '?']], oDate.fMinutesFromDateTime);
cStaticContext.defineSystemFunction("seconds-from-dateTime", [[cXSDateTime, '?']], oDate.fSecondsFromDateTime);
cStaticContext.defineSystemFunction("timezone-from-dateTime", [[cXSDateTime, '?']], oDate.fTimezoneFromDateTime);
cStaticContext.defineSystemFunction("year-from-date", [[cXSDate, '?']], oDate.fYearFromDate);
cStaticContext.defineSystemFunction("month-from-date", [[cXSDate, '?']], oDate.fMonthFromDate);
cStaticContext.defineSystemFunction("day-from-date", [[cXSDate, '?']], oDate.fDayFromDate);
cStaticContext.defineSystemFunction("timezone-from-date", [[cXSDate, '?']], oDate.fTimezoneFromDate);
cStaticContext.defineSystemFunction("hours-from-time", [[cXSTime, '?']], oDate.fHoursFromTime);
cStaticContext.defineSystemFunction("minutes-from-time", [[cXSTime, '?']], oDate.fMinutesFromTime);
cStaticContext.defineSystemFunction("seconds-from-time", [[cXSTime, '?']], oDate.fSecondsFromTime);
cStaticContext.defineSystemFunction("timezone-from-time", [[cXSTime, '?']], oDate.fTimezoneFromTime);
cStaticContext.defineSystemFunction("adjust-dateTime-to-timezone", [[cXSDateTime, '?'], [cXSDayTimeDuration, '?', true]], oDate.fAdjustDateTimeToTimezone);
cStaticContext.defineSystemFunction("adjust-date-to-timezone", [[cXSDate, '?'], [cXSDayTimeDuration, '?', true]], oDate.fAdjustDateToTimezone);
cStaticContext.defineSystemFunction("adjust-time-to-timezone", [[cXSTime, '?'], [cXSDayTimeDuration, '?', true]], oDate.fAdjustTimeToTimezone);
// node
cStaticContext.defineSystemFunction("name", [[cXTNode, '?', true]], oNode.fName);
cStaticContext.defineSystemFunction("local-name", [[cXTNode, '?', true]], oNode.fLocalName);
cStaticContext.defineSystemFunction("namespace-uri", [[cXTNode, '?', true]], oNode.fNamespaceUri);
cStaticContext.defineSystemFunction("number", [[cXSAnyAtomicType, '?', true]], oNode.fNumber);
cStaticContext.defineSystemFunction("lang", [[cXSString, '?'], [cXTNode, '', true]], oNode.fLang);
cStaticContext.defineSystemFunction("root", [[cXTNode, '?', true]], oNode.fRoot);
// numeric
cStaticContext.defineSystemFunction("abs", [[cXSDouble, '?']], oNumeric.fAbs);
cStaticContext.defineSystemFunction("ceiling", [[cXSDouble, '?']], oNumeric.fCeiling);
cStaticContext.defineSystemFunction("floor", [[cXSDouble, '?']], oNumeric.fFloor);
cStaticContext.defineSystemFunction("round", [[cXSDouble, '?']], oNumeric.fRound);
cStaticContext.defineSystemFunction("round-half-to-even", [[cXSDouble, '?'], [cXSInteger, '', true]], oNumeric.fRoundHalfToEven);
// qname
cStaticContext.defineSystemFunction("resolve-QName", [[cXSString, '?'], [cXTElement]], oQName.fResolveQName);
cStaticContext.defineSystemFunction("QName", [[cXSString, '?'], [cXSString]], oQName.fQName);
cStaticContext.defineSystemFunction("prefix-from-QName", [[cXSQName, '?']], oQName.fPrefixFromQName);
cStaticContext.defineSystemFunction("local-name-from-QName", [[cXSQName, '?']], oQName.fLocalNameFromQName);
cStaticContext.defineSystemFunction("namespace-uri-from-QName", [[cXSQName, '?']], oQName.fNamespaceUriFromQName);
cStaticContext.defineSystemFunction("namespace-uri-for-prefix", [[cXSString, '?'], [cXTElement]], oQName.fNamespaceUriForPrefix);
cStaticContext.defineSystemFunction("in-scope-prefixes", [[cXTElement]], oQName.fInScopePrefixes);
// sequence
cStaticContext.defineSystemFunction("boolean", [[cXTItem, '*']], oSequence.fBoolean);
cStaticContext.defineSystemFunction("index-of", [[cXSAnyAtomicType, '*'], [cXSAnyAtomicType], [cXSString, '', true]], oSequence.fIndexOf);
cStaticContext.defineSystemFunction("empty", [[cXTItem, '*']], oSequence.fEmpty);
cStaticContext.defineSystemFunction("exists", [[cXTItem, '*']], oSequence.fExists);
cStaticContext.defineSystemFunction("distinct-values", [[cXSAnyAtomicType, '*'], [cXSString, '', true]], oSequence.fDistinctValues);
cStaticContext.defineSystemFunction("insert-before", [[cXTItem, '*'], [cXSInteger], [cXTItem, '*']], oSequence.fInsertBefore);
cStaticContext.defineSystemFunction("remove", [[cXTItem, '*'], [cXSInteger]], oSequence.fRemove);
cStaticContext.defineSystemFunction("reverse", [[cXTItem, '*']], oSequence.fReverse);
cStaticContext.defineSystemFunction("subsequence", [[cXTItem, '*'], [cXSDouble, ''], [cXSDouble, '', true]], oSequence.fSubsequence);
cStaticContext.defineSystemFunction("unordered", [[cXTItem, '*']], oSequence.fUnordered);
cStaticContext.defineSystemFunction("zero-or-one", [[cXTItem, '*']], oSequence.fZeroOrOne);
cStaticContext.defineSystemFunction("one-or-more", [[cXTItem, '*']], oSequence.fOneOrMore);
cStaticContext.defineSystemFunction("exactly-one", [[cXTItem, '*']], oSequence.fExactlyOne);
cStaticContext.defineSystemFunction("deep-equal", [[cXTItem, '*'], [cXTItem, '*'], [cXSString, '', true]], oSequence.fDeepEqual);
cStaticContext.defineSystemFunction("count", [[cXTItem, '*']], oSequence.fCount);
cStaticContext.defineSystemFunction("avg", [[cXSAnyAtomicType, '*']], oSequence.fAvg);
cStaticContext.defineSystemFunction("max", [[cXSAnyAtomicType, '*'], [cXSString, '', true]], oSequence.fMax);
cStaticContext.defineSystemFunction("min", [[cXSAnyAtomicType, '*'], [cXSString, '', true]], oSequence.fMin);
cStaticContext.defineSystemFunction("sum", [[cXSAnyAtomicType, '*'], [cXSAnyAtomicType, '?', true]], oSequence.fSum);
cStaticContext.defineSystemFunction("id", [[cXSString, '*'], [cXTNode, '', true]], oSequence.fId);
cStaticContext.defineSystemFunction("idref", [[cXSString, '*'], [cXTNode, '', true]], oSequence.fIdref);
cStaticContext.defineSystemFunction("doc", [[cXSString, '?', true]], oSequence.fDoc);
cStaticContext.defineSystemFunction("doc-available", [[cXSString, '?', true]], oSequence.fDocAvailable);
cStaticContext.defineSystemFunction("collection", [[cXSString, '?', true]], oSequence.fCollection);
cStaticContext.defineSystemFunction("element-with-id", [[cXSString, '*'], [cXTNode, '', true]], oSequence.fElementWithId);
// string
cStaticContext.defineSystemFunction("codepoints-to-string", [[cXSInteger, '*']], oString.fCodepointsToString);
cStaticContext.defineSystemFunction("string-to-codepoints", [[cXSString, '?']], oString.fStringToCodepoints);
cStaticContext.defineSystemFunction("compare", [[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]], oString.fCompare);
cStaticContext.defineSystemFunction("codepoint-equal", [[cXSString, '?'], [cXSString, '?']], oString.fCodepointEqual);
cStaticContext.defineSystemFunction("concat", null, oString.fConcat);
cStaticContext.defineSystemFunction("string-join", [[cXSString, '*'], [cXSString]], oString.fStringJoin);
cStaticContext.defineSystemFunction("substring", [[cXSString, '?'], [cXSDouble], [cXSDouble, '', true]], oString.fSubstring);
cStaticContext.defineSystemFunction("string-length", [[cXSString, '?', true]], oString.fStringLength);
cStaticContext.defineSystemFunction("normalize-space", [[cXSString, '?', true]], oString.fNormalizeSpace);
cStaticContext.defineSystemFunction("normalize-unicode", [[cXSString, '?'], [cXSString, '', true]], oString.fNormalizeUnicode);
cStaticContext.defineSystemFunction("upper-case", [[cXSString, '?']], oString.fUpperCase);
cStaticContext.defineSystemFunction("lower-case", [[cXSString, '?']], oString.fLowerCase);
cStaticContext.defineSystemFunction("translate", [[cXSString, '?'], [cXSString], [cXSString]], oString.fTranslate);
cStaticContext.defineSystemFunction("encode-for-uri", [[cXSString, '?']], oString.fEncodeForUri);
cStaticContext.defineSystemFunction("iri-to-uri", [[cXSString, '?']], oString.fIriToUri);
cStaticContext.defineSystemFunction("escape-html-uri", [[cXSString, '?']], oString.fEscapeHtmlUri);
cStaticContext.defineSystemFunction("contains", [[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]], oString.fContains);
cStaticContext.defineSystemFunction("starts-with", [[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]], oString.fStartsWith);
cStaticContext.defineSystemFunction("ends-with", [[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]], oString.fEndsWith);
cStaticContext.defineSystemFunction("substring-before", [[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]], oString.fSubstringBefore);
cStaticContext.defineSystemFunction("substring-after", [[cXSString, '?'], [cXSString, '?'], [cXSString, '', true]], oString.fSubstringAfter);
cStaticContext.defineSystemFunction("matches", [[cXSString, '?'], [cXSString], [cXSString, '', true]], oString.fMatches);
cStaticContext.defineSystemFunction("replace", [[cXSString, '?'], [cXSString],  [cXSString], [cXSString, '', true]], oString.fReplace);
cStaticContext.defineSystemFunction("tokenize", [[cXSString, '?'], [cXSString], [cXSString, '', true]], oString.fTokenize);
// trace
cStaticContext.defineSystemFunction("trace", [[cXTItem, '*'], [cXSString]], oTrace.fTrace);