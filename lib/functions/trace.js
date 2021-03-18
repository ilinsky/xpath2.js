/*
	4 The Trace Function
		trace
*/

var exports = {};

// fn:trace($value as item()*, $label as xs:string) as item()*
exports.trace = function(oSequence1, oLabel) {
	var oConsole	= global.console;
	if (oConsole && oConsole.log)
		oConsole.log(oLabel.valueOf(), oSequence1);
	return oSequence1;
};

module.exports = exports;
