//
var cXSAnyType = require('./schema/XSAnyType');
var cXSAnySimpleType = require('./schema/XSAnySimpleType');
var cXSUntyped = require('./schema/XSUntyped');
//
var cXSAnyAtomicType = require('./schema/simple/XSAnyAtomicType');
var cXSENTITIES = require('./schema/simple/XSENTITIES');
var cXSIDREFS = require('./schema/simple/XSIDREFS');
var cXSNMTOKENS = require('./schema/simple/XSNMTOKENS');
//
var cXSAnyURI = require('./schema/simple/atomic/XSAnyURI');
var cXSBase64Binary = require('./schema/simple/atomic/XSBase64Binary');
var cXSBoolean = require('./schema/simple/atomic/XSBoolean');
var cXSDate = require('./schema/simple/atomic/XSDate');
var cXSDateTime = require('./schema/simple/atomic/XSDateTime');
var cXSDecimal = require('./schema/simple/atomic/XSDecimal');
var cXSDouble = require('./schema/simple/atomic/XSDouble');
var cXSDuration = require('./schema/simple/atomic/XSDuration');
var cXSFloat = require('./schema/simple/atomic/XSFloat');
var cXSGDay = require('./schema/simple/atomic/XSGDay');
var cXSGMonth = require('./schema/simple/atomic/XSGMonth');
var cXSGMonthDay = require('./schema/simple/atomic/XSGMonthDay');
var cXSGYear = require('./schema/simple/atomic/XSGYear');
var cXSGYearMonth = require('./schema/simple/atomic/XSGYearMonth');
var cXSHexBinary = require('./schema/simple/atomic/XSHexBinary');
var cXSNOTATION = require('./schema/simple/atomic/XSNOTATION');
var cXSQName = require('./schema/simple/atomic/XSQName');
var cXSString = require('./schema/simple/atomic/XSString');
var cXSTime = require('./schema/simple/atomic/XSTime');
var cXSUntypedAtomic = require('./schema/simple/atomic/XSUntypedAtomic');
//
var cXSDayTimeDuration = require('./schema/simple/atomic/duration/XSDayTimeDuration');
var cXSYearMonthDuration = require('./schema/simple/atomic/duration/XSYearMonthDuration');
//
var cXSByte = require('./schema/simple/atomic/integer/XSByte');
var cXSInt = require('./schema/simple/atomic/integer/XSInt');
var cXSInteger = require('./schema/simple/atomic/integer/XSInteger');
var cXSLong = require('./schema/simple/atomic/integer/XSLong');
var cXSNegativeInteger = require('./schema/simple/atomic/integer/XSNegativeInteger');
var cXSNonNegativeInteger = require('./schema/simple/atomic/integer/XSNonNegativeInteger');
var cXSNonPositiveInteger = require('./schema/simple/atomic/integer/XSNonPositiveInteger');
var cXSPositiveInteger = require('./schema/simple/atomic/integer/XSPositiveInteger');
var cXSShort = require('./schema/simple/atomic/integer/XSShort');
var cXSUnsignedByte = require('./schema/simple/atomic/integer/XSUnsignedByte');
var cXSUnsignedInt = require('./schema/simple/atomic/integer/XSUnsignedInt');
var cXSUnsignedLong = require('./schema/simple/atomic/integer/XSUnsignedLong');
var cXSUnsignedShort = require('./schema/simple/atomic/integer/XSUnsignedShort');
//
var cXSENTITY = require('./schema/simple/atomic/string/XSENTITY');
var cXSID = require('./schema/simple/atomic/string/XSID');
var cXSIDREF = require('./schema/simple/atomic/string/XSIDREF');
var cXSLanguage = require('./schema/simple/atomic/string/XSLanguage');
var cXSName = require('./schema/simple/atomic/string/XSName');
var cXSNCName = require('./schema/simple/atomic/string/XSNCName');
var cXSNMTOKEN = require('./schema/simple/atomic/string/XSNMTOKEN');
var cXSNormalizedString = require('./schema/simple/atomic/string/XSNormalizedString');
var cXSToken = require('./schema/simple/atomic/string/XSToken');

//
var cStaticContext = require('./../classes/StaticContext');
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
