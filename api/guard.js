/*
 * Guard.js - JavaScript API validation library
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Licensed under the MIT license.
 *
 * See: https://github.com/ilinsky/guard.js
 *
 */

// Validation implementation
var fGuard	= function(aArguments, aParameters) {
	// Determining API caller function reference
	var fCallee	= aArguments.callee;

	// Determine fGuard caller function name
	var sName	= cString(fCallee).match(rGuard_function) ? cRegExp.$1 : "<anonymous>";

	// Validate arguments
	for (var nIndex = 0, aParameter, nLength = aArguments.length, vValue, bUndefined, sArgument; aParameter = aParameters[nIndex]; nIndex++) {
		vValue		= aArguments[nIndex];
		bUndefined	= typeof vValue == "undefined";
		sArgument	=(nIndex + 1)+ aGuard_endings[nIndex < 3 ? nIndex : 3];

		// See if argument is missing
		if (bUndefined && !aParameter[2])
			throw new cGuard_Exception(
						cGuard_Exception.ARGUMENT_MISSING_ERR,
						[sArgument, aParameter[0], sName]
			);

		if (nLength > nIndex) {
			if (vValue === null) {
				// See if null is not allowed
				if (!aParameter[3])
					throw new cGuard_Exception(
							cGuard_Exception.ARGUMENT_NULL_ERR,
							[sArgument, aParameter[0], sName]
					);
			}
			else {
				// See if argument has correct type
				if (!fGuard_instanceOf(vValue, aParameter[1]))
					throw new cGuard_Exception(
							cGuard_Exception.ARGUMENT_TYPE_ERR,
							[sArgument, aParameter[0], sName, cString(aParameter[1]).match(rGuard_function) ? cRegExp.$1 : "<unknown>", bUndefined ? "undefined" : cString(fGuard_typeOf(vValue)).match(rGuard_function) ? cRegExp.$1 : "<unknown>"]
					);
			}
		}
	}
};

function fGuard_instanceOf(vValue, cType) {
	var sType	= cObject.prototype.toString.call(vValue).match(rGuard_object)[1];
	switch (cType) {
		// Primitive types
		case cString:
			return sType == "String";
		case cBoolean:
			return sType == "Boolean";
		case cNumber:
			return sType == "Number";
		case cArray:
			return sType == "Array";
		case cFunction:
			return sType == "Function";
		case cRegExp:
			return sType == "RegExp";
			// Special type cGuard_Arguments (pseudo type for JavaScript arguments object)
		case cGuard_Arguments:
			return typeof vValue == "object" && "callee" in vValue;
		default:
			// Complex types
			return cType == cObject ? true : vValue instanceof cType;
	}
};

function fGuard_typeOf(vValue) {
	return typeof vValue == "object" && "callee" in vValue ? cGuard_Arguments : vValue.constructor;
};

// Function Guard.Exception
var cGuard_Exception	= function(nException, aArguments) {
	this.code	= nException;
	this.message= fGuard_format(hGuard_Exception_messages[nException], aArguments);
};

cGuard_Exception.ARGUMENT_MISSING_ERR	= 1;
cGuard_Exception.ARGUMENT_TYPE_ERR		= 2;
cGuard_Exception.ARGUMENT_NULL_ERR		= 3;

cGuard_Exception.prototype	= new cError;

cGuard_Exception.prototype.code		= null;
cGuard_Exception.prototype.message	= null;

var hGuard_Exception_messages	= {};
hGuard_Exception_messages[cGuard_Exception.ARGUMENT_MISSING_ERR]	= 'Missing %0 required argument "%1" in "%2" function call.';
hGuard_Exception_messages[cGuard_Exception.ARGUMENT_TYPE_ERR]		= 'Incompatible type of %0 argument "%1" in "%2" function call. Expected "%3", got "%4".';
hGuard_Exception_messages[cGuard_Exception.ARGUMENT_NULL_ERR]		= 'null is not allowed value of %0 argument "%1" in "%2" function call.';

// Function cGuard_Arguments (pseudo type for JavaScript arguments object)
var cGuard_Arguments	= function() {

};

//
function fGuard_sign(vValue, sName) {
	(vValue.toString	= function() {
		return "function " + sName + "() {\t[guard code]\t}";
	}).toString	= fGuard_sign_toString;
	return vValue;
};

function fGuard_sign_toString() {
	return "function toString() {\t[guard code]\t}";
};
fGuard_sign_toString.toString	= fGuard_sign_toString;

// Utility functions etc
var aGuard_endings	= 'st-nd-rd-th'.split('-'),
	rGuard_object	= /object\s([^\s]+)\]/,
	rGuard_function	= /function ([^\(]+)\(/;
function fGuard_format(sMessage, aArguments) {
	for (var nIndex = 0; nIndex < aArguments.length; nIndex++)
		sMessage	= sMessage.replace('%' + nIndex, aArguments[nIndex]);
	return sMessage;
};
