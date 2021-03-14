var xpath = require('./../../src');
var Exception = require('./../../src/classes/Exception');
var expect = require('chai').expect;

var mockDocument = require('./../mockNanoDocument');

describe("primary", function() {
    describe("context item", function() {
        // node
        it('', function() {
            expect(xpath.evaluate('.', mockDocument))
                .to.have.ordered.members([mockDocument]);
        });
        // xs:integer
        it('', function() {
            expect(xpath.evaluate('.', 0))
                .to.have.ordered.members([0]);
        });
        it('', function() {
            expect(xpath.evaluate('.', 23))
                .to.have.ordered.members([23]);
        });
        // xs:decimal
        it('', function() {
            expect(xpath.evaluate('.', 23.5))
                .to.have.ordered.members([23.5]);
        });
        // xs:double
        it('', function() {
            expect(xpath.evaluate('.', 1e-10))
                .to.have.ordered.members([1e-10]);
        });
        // xs:boolean
        it('', function() {
            expect(xpath.evaluate('.', true))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('.', false))
                .to.have.ordered.members([false]);
        });
        // xs:string
        it('', function() {
            expect(xpath.evaluate('.', ""))
                .to.have.ordered.members([""]);
        });
        it('', function() {
            expect(xpath.evaluate('.', "0"))
                .to.have.ordered.members(["0"]);
        });
        // no context
        it('', function() {
            expect(function(){xpath.evaluate('.', null)})
                .to.throw(Exception, 'Dynamic context does not have context item initialized');
        });
        it('', function() {
            expect(function(){xpath.evaluate('.', undefined)})
                .to.throw(Exception, 'Dynamic context does not have context item initialized');
        });
        it('', function() {
            expect(function(){xpath.evaluate('.')})
                .to.throw(Exception, 'Dynamic context does not have context item initialized');
        });
    });

    describe("filter", function() {
        it('', function() {
            expect(xpath.evaluate('(1, 2)[2]'))
                .to.have.ordered.members([2]);
        });
        it('', function() {
            expect(xpath.evaluate('(1, 2)[3]'))
                .to.have.ordered.members([]);
        });
        it('', function() {
            expect(xpath.evaluate('(1, 2, 3)[. eq 3]'))
                .to.have.ordered.members([3]);
        });
        it('', function() {
            expect(xpath.evaluate('(1, 2, 3)[. eq 4]'))
                .to.have.ordered.members([]);
        });
        it('', function() {
            expect(xpath.evaluate('1[fn:true()]'))
                .to.have.ordered.members([1]);
        });
        it('', function() {
            expect(xpath.evaluate('1[fn:false()]'))
                .to.have.ordered.members([]);
        });
        it('', function() {
            expect(xpath.evaluate('1[1]'))
                .to.have.ordered.members([1]);
        });
        it('', function() {
            expect(xpath.evaluate('1[2]'))
                .to.have.ordered.members([]);
        });
    });

    describe("function call", function() {
        it('', function() {
            expect(xpath.evaluate('fn:true()'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:not(fn:true())'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('fn:unknown()')})
                .to.throw(Exception, 'Unknown system function: {http://www.w3.org/2005/xpath-functions}unknown()');
        });
        it('', function() {
            expect(function(){xpath.evaluate('my:unknown()', null, function() { return 'http://test' })})
                .to.throw(Exception, 'Unknown user function: {http://test}unknown()');
        });
    });

    describe("numeric literal", function() {
        it('', function() {
            expect(xpath.evaluate('1'))
                .to.have.ordered.members([1]);
        });
        it('', function() {
            expect(xpath.evaluate('1.2'))
                .to.have.ordered.members([1.2]);
        });
        it('', function() {
            expect(xpath.evaluate('-1.2'))
                .to.have.ordered.members([-1.2]);
        });
        it('', function() {
            expect(xpath.evaluate('1e3'))
                .to.have.ordered.members([1000]);
        });
    });

    describe("parenthesized", function() {
        it('', function() {
            expect(xpath.evaluate('(1, 2)'))
                .to.have.ordered.members([1, 2]);
        });
        it('', function() {
            expect(xpath.evaluate('(1, (2, 3), 4)'))
                .to.have.ordered.members([1, 2, 3, 4]);
        });
        it('', function() {
            expect(xpath.evaluate('()'))
                .to.have.ordered.members([]);
        });
    });

    describe("string literal", function() {
        it('', function() {
            expect(xpath.evaluate("'1'"))
                .to.have.ordered.members(["1"]);
        });
        it('', function() {
            expect(xpath.evaluate("'false'"))
                .to.have.ordered.members(["false"]);
        });
        it('', function() {
            expect(xpath.evaluate("'0'"))
                .to.have.ordered.members(["0"]);
        });
        it('', function() {
            expect(xpath.evaluate("'-0'"))
                .to.have.ordered.members(["-0"]);
        });
        //
        it('', function() {
            expect(xpath.evaluate('"1"'))
                .to.have.ordered.members(["1"]);
        });
    });

    describe("var ref", function() {
        it('', function() {
            expect(xpath.evaluate('$string', null, null, {string: "value"}))
                .to.have.ordered.members(['value']);
        });

        it('', function() {
            expect(xpath.evaluate('$boolean', null, null, {boolean: true}))
                .to.have.ordered.members([true]);
        });

        it('', function() {
            expect(xpath.evaluate('$integer', null, null, {integer: 10}))
                .to.have.ordered.members([10]);
        });

        it('', function() {
            expect(xpath.evaluate('$decimal', null, null, {decimal: 10.5}))
                .to.have.ordered.members([10.5]);
        });

        it('', function() {
            expect(xpath.evaluate('fn:string($double)', null, null, {double: NaN}))
                .to.have.ordered.members(['NaN']);
        });

        it('', function() {
            expect(xpath.evaluate('$double', null, null, {double: Infinity}))
                .to.have.ordered.members([Infinity]);
        });

        it('', function() {
            expect(xpath.evaluate('$double', null, null, {double: 1e+100}))
                .to.have.ordered.members([1e+100]);
        });

        it('', function() {
            expect(function(){xpath.evaluate('$undefined', null, null, {})})
                .to.throw(Exception, 'Variable $undefined has not been declared');
        });

        it('', function() {
            expect(function(){xpath.evaluate('$undefined')})
                .to.throw(Exception, 'Variable $undefined has not been declared');
        });
    });
});