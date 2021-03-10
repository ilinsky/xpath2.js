var xpath = require('./../../api/xpath');
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

    // TODO: VarRef
//    describe("var ref", function() {
//
//    });
});