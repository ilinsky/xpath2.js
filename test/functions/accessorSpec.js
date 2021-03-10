var xpath = require('./../../api/xpath');
var expect = require('chai').expect;

var mockDocument = require('./../mockDocument');

describe("accessor", function() {
    describe("node-name()", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:node-name(.)', mockDocument))
                .to.have.ordered.members([]);
        });
        it('', function() {
            // string wrapper, as xs:QName returned
            expect(xpath.evaluate('fn:string(fn:node-name(child::element()))', mockDocument))
                .to.have.ordered.members(["test-element"]);
        });
    });

    describe("nilled()", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:nilled(.)', mockDocument))
                .to.have.ordered.members([]);
        });
        it('', function() {
            // string wrapper, as xs:QName returned
            expect(xpath.evaluate('fn:nilled(child::element())', mockDocument))
                .to.have.ordered.members([false]);
        });
    });

    describe("string()", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:string(1)', mockDocument))
                .to.have.ordered.members(["1"]);
        });
    });

    describe("data()", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:data(("2", 1, fn:true()))', mockDocument))
                .to.have.ordered.members(["2", 1, true]);
        });
        // TODO: Check attribute/element values
    });

    describe("base-uri()", function() {
        // Not W3C tests
        it('', function() {
            // TODO: check test
            expect(xpath.evaluate('fn:base-uri()', mockDocument))
                .to.have.ordered.members(['']);
        });
        it('', function() {
            // TODO: check test
            expect(xpath.evaluate('fn:base-uri(child::element())', mockDocument))
                .to.have.ordered.members(['']);
        });
    });

    describe("document-uri()", function() {
        // Not W3C tests
        it('', function() {
            // TODO: check test
            expect(xpath.evaluate('fn:document-uri(.)', mockDocument))
                .to.have.ordered.members(['']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:document-uri(child::element())', mockDocument))
                .to.have.ordered.members([]);
        });
    });
});