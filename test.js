
var xpath = require("./api/xpath");

// var result = xpath.evaluate('1');

// expressions
// - arithmetic
var result = xpath.evaluate('1 + 2');
var result = xpath.evaluate('1 - 2');
var result = xpath.evaluate('1 * 2');
var result = xpath.evaluate('1 div 2 div 0.25');
var result = xpath.evaluate('-2');
// - comparison
var result = xpath.evaluate('1 gt 5');
// - for
// var result = xpath.evaluate('for $a in 1 to 5');
// - if
// var result = xpath.evaluate('if (fn:true()) then 1 else 0');
// - logical
var result = xpath.evaluate('1 and 0');
var result = xpath.evaluate('1 or 0');
// path

// - tests

// primary
var result = xpath.evaluate('.', "context");
//var result = xpath.evaluate('1[1]');
var result = xpath.evaluate('fn:true()');
var result = xpath.evaluate('1');
// var result = xpath.evaluate('(1)');
var result = xpath.evaluate('"string"');
var result = xpath.evaluate('$a', {}, null, {a:23});
// quantified
//var result = xpath.evaluate('some $a in 1 to 5 satisfies fn:true()', {}, null, {a:23});
// sequence
var result = xpath.evaluate('1 to 5');
//var result = xpath.evaluate('/ intersect /');
//var result = xpath.evaluate('/ union /');
// type
var result = xpath.evaluate('1 cast as xs:string');
var result = xpath.evaluate('"1" instance of xs:string');
var result = xpath.evaluate('"1" treat as xs:string');
var result = xpath.evaluate('"1" castable as xs:boolean');
// - types

// functions
// var result = xpath.evaluate('fn:string("string")');
// var result = xpath.evaluate('fn:resolve-uri("uri")');
var result = xpath.evaluate('fn:true()');
var result = xpath.evaluate('fn:current-dateTime()');
// var result = xpath.evaluate('fn:timezone-from-time(fn:current-time())');
// var result = xpath.evaluate('fn:root()');
// var result = xpath.evaluate('fn:round-half-to-even(4.5)');
// var result = xpath.evaluate('fn:QName("prefix","uri")');
// var result = xpath.evaluate('fn:count(1 to 5)');
// var result = xpath.evaluate('fn:concat("a","b")');
// var result = xpath.evaluate('fn:trace(1, "tracing")');


// operators
var result = xpath.evaluate('fn:true() eq fn:true()');
var result = xpath.evaluate('fn:current-date() eq fn:current-date()'); // bug??
// var result = xpath.evaluate('fn:is-same-node(fn:root(), fn:root())');



// types
// var result = xpath.evaluate('xs:boolean("true")');
//var result = xpath.evaluate('xs:dayTimeDuration("1D") + xs:dayTimeDuration("1D")');
// var result = xpath.evaluate('concat("a","b")');
//var result = xpath.evaluate('test(1)');


var result = xpath.evaluate('1 to 5');

console.dir(result);




// performance test
// var started = new Date;
// for (var n = 0; n < 100000; n++) {
//     var result = xpath.evaluate(n + ' cast as xs:decimal');
// }
// console.log('elapsed...' + (new Date() - started) + 'ms.');