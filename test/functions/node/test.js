var xpath = require('./../../../api/xpath');
var expect = require('chai').expect;

var mockDocument = require('./../../mockDocument');

describe("node", function() {
    describe("name()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:name(.)', mockDocument))
                .to.have.ordered.members(['']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:name(child::element())', mockDocument))
                .to.have.ordered.members(['test-element']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:name(child::element()/@test-attribute)', mockDocument))
                .to.have.ordered.members(['test-attribute']);
        });
    });

    describe("local-name()", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:local-name(.)', mockDocument))
                .to.have.ordered.members(['']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:local-name(child::element())', mockDocument))
                .to.have.ordered.members(['test-element']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:local-name(child::element()/@test-attribute)', mockDocument))
                .to.have.ordered.members(['test-attribute']);
        });
    });

    describe("namespace-uri()", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:namespace-uri(.)', mockDocument))
                .to.have.ordered.members(['']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:namespace-uri(child::element())', mockDocument))
                .to.have.ordered.members(['']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:namespace-uri(child::element()/@test-attribute)', mockDocument))
                .to.have.ordered.members(['']);
        });
    });

    describe("number()", function() {
        // FIXME: Check test if correct
        xit('', function() {
            expect(xpath.evaluate('fn:number("12.12")'))
                .to.have.ordered.members([12.12]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:number(fn:true())'))
                .to.have.ordered.members([1]);
        });
        // FIXME: check how to verify NaN return
        xit('', function() {
            expect(xpath.evaluate('fn:number(())'))
                .to.have.ordered.members([NaN]);
        });
        xit('', function() {
            expect(xpath.evaluate('fn:number("")'))
                .to.have.ordered.members([NaN]);
        });
    });

    describe("lang()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:lang("en")', mockDocument))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:lang("fr")', mockDocument))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:lang("en", child::element())', mockDocument))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:lang("fr", child::element())', mockDocument))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:lang("en", child::element()/@test-attribute)', mockDocument))
                .to.have.ordered.members([true]);
        });
    });

    describe("root()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:root()', mockDocument))
                .to.have.ordered.members([mockDocument]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:root(child::element())', mockDocument))
                .to.have.ordered.members([mockDocument]);
        });
    });
});

