//
var cXSAnyType = require('./types/XSAnyType');
var cXSAnySimpleType = require('./types/XSAnySimpleType');
var cXSUntyped = require('./types/XSUntyped');
var cXTItem = require('./types/XTItem');
var cXTNode = require('./types/XTNode');
//
var cXTAttribute = require('./types/node/XTAttribute');
var cXTComment = require('./types/node/XTComment');
var cXTDocument = require('./types/node/XTDocument');
var cXTElement = require('./types/node/XTElement');
var cXTProcessingInstruction = require('./types/node/XTProcessingInstruction');
var cXTText = require('./types/node/XTText');
//
var cXSAnyAtomicType = require('./types/simple/XSAnyAtomicType');
var cXSENTITIES = require('./types/simple/XSENTITIES');
var cXSIDREFS = require('./types/simple/XSIDREFS');
var cXSNMTOKENS = require('./types/simple/XSNMTOKENS');
//
var cXSAnyURI = require('./types/simple/atomic/XSAnyURI');
var cXSBase64Binary = require('./types/simple/atomic/XSBase64Binary');
var cXSBoolean = require('./types/simple/atomic/XSBoolean');
var cXSDate = require('./types/simple/atomic/XSDate');
var cXSDateTime = require('./types/simple/atomic/XSDateTime');
var cXSDecimal = require('./types/simple/atomic/XSDecimal');
var cXSDouble = require('./types/simple/atomic/XSDouble');
var cXSDuration = require('./types/simple/atomic/XSDuration');
var cXSFloat = require('./types/simple/atomic/XSFloat');
var cXSGDay = require('./types/simple/atomic/XSGDay');
var cXSGMonth = require('./types/simple/atomic/XSGMonth');
var cXSGMonthDay = require('./types/simple/atomic/XSGMonthDay');
var cXSGYear = require('./types/simple/atomic/XSGYear');
var cXSGYearMonth = require('./types/simple/atomic/XSGYearMonth');
var cXSHexBinary = require('./types/simple/atomic/XSHexBinary');
var cXSNOTATION = require('./types/simple/atomic/XSNOTATION');
var cXSQName = require('./types/simple/atomic/XSQName');
var cXSString = require('./types/simple/atomic/XSString');
var cXSTime = require('./types/simple/atomic/XSTime');
var cXSUntypedAtomic = require('./types/simple/atomic/XSUntypedAtomic');
//
var cXSDayTimeDuration = require('./types/simple/atomic/duration/XSDayTimeDuration');
var cXSYearMonthDuration = require('./types/simple/atomic/duration/XSYearMonthDuration');
//
var cXSByte = require('./types/simple/atomic/integer/XSByte');
var cXSInt = require('./types/simple/atomic/integer/XSInt');
var cXSInteger = require('./types/simple/atomic/integer/XSInteger');
var cXSLong = require('./types/simple/atomic/integer/XSLong');
var cXSNegativeInteger = require('./types/simple/atomic/integer/XSNegativeInteger');
var cXSNonNegativeInteger = require('./types/simple/atomic/integer/XSNonNegativeInteger');
var cXSNonPositiveInteger = require('./types/simple/atomic/integer/XSNonPositiveInteger');
var cXSPositiveInteger = require('./types/simple/atomic/integer/XSPositiveInteger');
var cXSShort = require('./types/simple/atomic/integer/XSShort');
var cXSUnsignedByte = require('./types/simple/atomic/integer/XSUnsignedByte');
var cXSUnsignedInt = require('./types/simple/atomic/integer/XSUnsignedInt');
var cXSUnsignedLong = require('./types/simple/atomic/integer/XSUnsignedLong');
var cXSUnsignedShort = require('./types/simple/atomic/integer/XSUnsignedShort');
//
var cXSENTITY = require('./types/simple/atomic/string/XSENTITY');
var cXSID = require('./types/simple/atomic/string/XSID');
var cXSIDREF = require('./types/simple/atomic/string/XSIDREF');
var cXSLanguage = require('./types/simple/atomic/string/XSLanguage');
var cXSName = require('./types/simple/atomic/string/XSName');
var cXSNCName = require('./types/simple/atomic/string/XSNCName');
var cXSNMTOKEN = require('./types/simple/atomic/string/XSNMTOKEN');
var cXSNormalizedString = require('./types/simple/atomic/string/XSNormalizedString');
var cXSToken = require('./types/simple/atomic/string/XSToken');

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

var rXSNumericLiteral	= /^[+\-]?(?:(?:(\d+)(?:\.(\d*))?)|(?:\.(\d+)))(?:[eE]([+-])?(\d+))?$/;
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
  XSAnyType: cXSAnyType,
  XSAnySimpleType: cXSAnySimpleType,
  XSUntyped: cXSUntyped,
  XTItem: cXTItem,
  XTNode: cXTNode,
  // node
  XTAttribute: cXTAttribute,
  XTComment: cXTComment,
  XTDocument: cXTDocument,
  XTElement: cXTElement,
  XTProcessingInstruction: cXTProcessingInstruction,
  XTText: cXTText,
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
}
