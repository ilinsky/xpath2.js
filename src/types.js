//
var cXTItem = require('./types/xpath/XTItem');
var cXTNode = require('./types/xpath/XTNode');
//
var cXTAttribute = require('./types/xpath/node/XTAttribute');
var cXTComment = require('./types/xpath/node/XTComment');
var cXTDocument = require('./types/xpath/node/XTDocument');
var cXTElement = require('./types/xpath/node/XTElement');
var cXTProcessingInstruction = require('./types/xpath/node/XTProcessingInstruction');
var cXTText = require('./types/xpath/node/XTText');
//
var cXSAnyType = require('./types/schema/XSAnyType');
var cXSAnySimpleType = require('./types/schema/XSAnySimpleType');
var cXSUntyped = require('./types/schema/XSUntyped');
//
var cXSAnyAtomicType = require('./types/schema/simple/XSAnyAtomicType');
var cXSENTITIES = require('./types/schema/simple/XSENTITIES');
var cXSIDREFS = require('./types/schema/simple/XSIDREFS');
var cXSNMTOKENS = require('./types/schema/simple/XSNMTOKENS');
//
var cXSAnyURI = require('./types/schema/simple/atomic/XSAnyURI');
var cXSBase64Binary = require('./types/schema/simple/atomic/XSBase64Binary');
var cXSBoolean = require('./types/schema/simple/atomic/XSBoolean');
var cXSDate = require('./types/schema/simple/atomic/XSDate');
var cXSDateTime = require('./types/schema/simple/atomic/XSDateTime');
var cXSDecimal = require('./types/schema/simple/atomic/XSDecimal');
var cXSDouble = require('./types/schema/simple/atomic/XSDouble');
var cXSDuration = require('./types/schema/simple/atomic/XSDuration');
var cXSFloat = require('./types/schema/simple/atomic/XSFloat');
var cXSGDay = require('./types/schema/simple/atomic/XSGDay');
var cXSGMonth = require('./types/schema/simple/atomic/XSGMonth');
var cXSGMonthDay = require('./types/schema/simple/atomic/XSGMonthDay');
var cXSGYear = require('./types/schema/simple/atomic/XSGYear');
var cXSGYearMonth = require('./types/schema/simple/atomic/XSGYearMonth');
var cXSHexBinary = require('./types/schema/simple/atomic/XSHexBinary');
var cXSNOTATION = require('./types/schema/simple/atomic/XSNOTATION');
var cXSQName = require('./types/schema/simple/atomic/XSQName');
var cXSString = require('./types/schema/simple/atomic/XSString');
var cXSTime = require('./types/schema/simple/atomic/XSTime');
var cXSUntypedAtomic = require('./types/schema/simple/atomic/XSUntypedAtomic');
//
var cXSDayTimeDuration = require('./types/schema/simple/atomic/duration/XSDayTimeDuration');
var cXSYearMonthDuration = require('./types/schema/simple/atomic/duration/XSYearMonthDuration');
//
var cXSByte = require('./types/schema/simple/atomic/integer/XSByte');
var cXSInt = require('./types/schema/simple/atomic/integer/XSInt');
var cXSInteger = require('./types/schema/simple/atomic/integer/XSInteger');
var cXSLong = require('./types/schema/simple/atomic/integer/XSLong');
var cXSNegativeInteger = require('./types/schema/simple/atomic/integer/XSNegativeInteger');
var cXSNonNegativeInteger = require('./types/schema/simple/atomic/integer/XSNonNegativeInteger');
var cXSNonPositiveInteger = require('./types/schema/simple/atomic/integer/XSNonPositiveInteger');
var cXSPositiveInteger = require('./types/schema/simple/atomic/integer/XSPositiveInteger');
var cXSShort = require('./types/schema/simple/atomic/integer/XSShort');
var cXSUnsignedByte = require('./types/schema/simple/atomic/integer/XSUnsignedByte');
var cXSUnsignedInt = require('./types/schema/simple/atomic/integer/XSUnsignedInt');
var cXSUnsignedLong = require('./types/schema/simple/atomic/integer/XSUnsignedLong');
var cXSUnsignedShort = require('./types/schema/simple/atomic/integer/XSUnsignedShort');
//
var cXSENTITY = require('./types/schema/simple/atomic/string/XSENTITY');
var cXSID = require('./types/schema/simple/atomic/string/XSID');
var cXSIDREF = require('./types/schema/simple/atomic/string/XSIDREF');
var cXSLanguage = require('./types/schema/simple/atomic/string/XSLanguage');
var cXSName = require('./types/schema/simple/atomic/string/XSName');
var cXSNCName = require('./types/schema/simple/atomic/string/XSNCName');
var cXSNMTOKEN = require('./types/schema/simple/atomic/string/XSNMTOKEN');
var cXSNormalizedString = require('./types/schema/simple/atomic/string/XSNormalizedString');
var cXSToken = require('./types/schema/simple/atomic/string/XSToken');

//
var cStaticContext = require('./classes/StaticContext');
//
cStaticContext.defineSystemDataType("anyAtomicType",	cXSAnyAtomicType);
// atomic
cStaticContext.defineSystemDataType("anyURI",	cXSAnyURI);
cStaticContext.defineSystemDataType("base64Binary",	cXSBase64Binary);
cStaticContext.defineSystemDataType("boolean",	cXSBoolean);
cStaticContext.defineSystemDataType("date",	cXSDate);
cStaticContext.defineSystemDataType("dateTime",	cXSDateTime);
cStaticContext.defineSystemDataType("decimal",	cXSDecimal);
cStaticContext.defineSystemDataType("double",	cXSDouble);
cStaticContext.defineSystemDataType("duration",	cXSDuration);
cStaticContext.defineSystemDataType("float",	cXSFloat);
cStaticContext.defineSystemDataType("gDay",	cXSGDay);
cStaticContext.defineSystemDataType("gMonth",	cXSGMonth);
cStaticContext.defineSystemDataType("gMonthDay",	cXSGMonthDay);
cStaticContext.defineSystemDataType("gYear",	cXSGYear);
cStaticContext.defineSystemDataType("gYearMonth",	cXSGYearMonth);
cStaticContext.defineSystemDataType("hexBinary",	cXSHexBinary);
cStaticContext.defineSystemDataType("NOTATION",	cXSNOTATION);
cStaticContext.defineSystemDataType("QName",	cXSQName);
cStaticContext.defineSystemDataType("string",	cXSString);
cStaticContext.defineSystemDataType("time",	cXSTime);
cStaticContext.defineSystemDataType("untypedAtomic",	cXSUntypedAtomic);
// duration
cStaticContext.defineSystemDataType("yearMonthDuration",	cXSYearMonthDuration);
cStaticContext.defineSystemDataType("dayTimeDuration",	cXSDayTimeDuration);
// integer
cStaticContext.defineSystemDataType("byte",	cXSByte);
cStaticContext.defineSystemDataType("int",	cXSInt);
cStaticContext.defineSystemDataType("integer",	cXSInteger);
cStaticContext.defineSystemDataType("long",	cXSLong);
cStaticContext.defineSystemDataType("negativeInteger",	cXSNegativeInteger);
cStaticContext.defineSystemDataType("nonNegativeInteger",	cXSNonNegativeInteger);
cStaticContext.defineSystemDataType("nonPositiveInteger",	cXSNonPositiveInteger);
cStaticContext.defineSystemDataType("positiveInteger",	cXSPositiveInteger);
cStaticContext.defineSystemDataType("short",	cXSShort);
cStaticContext.defineSystemDataType("unsignedByte",	cXSUnsignedByte);
cStaticContext.defineSystemDataType("unsignedInt",	cXSUnsignedInt);
cStaticContext.defineSystemDataType("unsignedLong",	cXSUnsignedLong);
cStaticContext.defineSystemDataType("unsignedShort",	cXSUnsignedShort);
// string
cStaticContext.defineSystemDataType("ENTITY",	cXSENTITY);
cStaticContext.defineSystemDataType("ID",	cXSID);
cStaticContext.defineSystemDataType("IDREF",	cXSIDREF);
cStaticContext.defineSystemDataType("language",	cXSLanguage);
cStaticContext.defineSystemDataType("Name",	cXSName);
cStaticContext.defineSystemDataType("NCName",	cXSNCName);
cStaticContext.defineSystemDataType("NMTOKEN",	cXSNMTOKEN);
cStaticContext.defineSystemDataType("normalizedString",	cXSNormalizedString);
cStaticContext.defineSystemDataType("token",	cXSToken);

var rXSNumericLiteral	= /^[+-]?(?:(?:(\d+)(?:\.(\d*))?)|(?:\.(\d+)))(?:[eE]([+-])?(\d+))?$/;
function fParseXSNumeric(sValue) {
	var aMatch	= sValue.match(rXSNumericLiteral);
	if (aMatch) {
		var cType	= cXSInteger;
		if (aMatch[5])
			cType	= cXSDouble;
		else
		if (aMatch[2] || aMatch[3])
			cType	= cXSDecimal;
		return new cType(+sValue);
	}
};

module.exports = {
  rXSNumericLiteral: rXSNumericLiteral,
  parseXSNumeric: fParseXSNumeric,

  //
  XTItem: cXTItem,
  XTNode: cXTNode,
  // node
  XTAttribute: cXTAttribute,
  XTComment: cXTComment,
  XTDocument: cXTDocument,
  XTElement: cXTElement,
  XTProcessingInstruction: cXTProcessingInstruction,
  XTText: cXTText,
  //
  XSAnyType: cXSAnyType,
  XSAnySimpleType: cXSAnySimpleType,
  XSUntyped: cXSUntyped,
  // simple
  XSAnyAtomicType: cXSAnyAtomicType,
  XSENTITIES: cXSENTITIES,
  XSIDREFS: cXSIDREFS,
  XSNMTOKENS: cXSNMTOKENS,
  // simple/atomic
  XSAnyURI: cXSAnyURI,
  XSBase64Binary: cXSBase64Binary,
  XSBoolean: cXSBoolean,
  XSDate: cXSDate,
  XSDateTime: cXSDateTime,
  XSDecimal: cXSDecimal,
  XSDouble: cXSDouble,
  XSDuration: cXSDuration,
  XSFloat: cXSFloat,
  XSGDay: cXSGDay,
  XSGMonth: cXSGMonth,
  XSGMonthDay: cXSGMonthDay,
  XSGYear: cXSGYear,
  XSGYearMonth: cXSGYearMonth,
  XSHexBinary: cXSHexBinary,
  XSNOTATION: cXSNOTATION,
  XSQName: cXSQName,
  XSString: cXSString,
  XSTime: cXSTime,
  XSUntypedAtomic: cXSUntypedAtomic,
  //
  XSDayTimeDuration: cXSDayTimeDuration,
  XSYearMonthDuration: cXSYearMonthDuration,
  XSByte: cXSByte,
  XSInt: cXSInt,
  XSInteger: cXSInteger,
  XSLong: cXSLong,
  XSNegativeInteger: cXSNegativeInteger,
  XSNonNegativeInteger: cXSNonNegativeInteger,
  XSNonPositiveInteger: cXSNonPositiveInteger,
  XSPositiveInteger: cXSPositiveInteger,
  XSShort: cXSShort,
  XSUnsignedByte: cXSUnsignedByte,
  XSUnsignedInt: cXSUnsignedInt,
  XSUnsignedLong: cXSUnsignedLong,
  XSUnsignedShort: cXSUnsignedShort,
  //
  XSENTITY: cXSENTITY,
  XSID: cXSID,
  XSIDREF: cXSIDREF,
  XSLanguage: cXSLanguage,
  XSName: cXSName,
  XSNCName: cXSNCName,
  XSNMTOKEN: cXSNMTOKEN,
  XSNormalizedString: cXSNormalizedString,
  XSToken: cXSToken
};
