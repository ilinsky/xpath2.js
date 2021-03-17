/*
	4 The Trace Function
		trace
*/

// fn:trace($value as item()*, $label as xs:string) as item()*
function fTrace(oSequence1, oLabel) {
	var oConsole	= global.console;
	if (oConsole && oConsole.log)
		oConsole.log(oLabel.valueOf(), oSequence1);
	return oSequence1;
};

module.exports = {
    fTrace: fTrace
};
