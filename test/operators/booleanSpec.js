var xpath = require('./../../lib');
var expect = require('chai').expect;

describe("boolean", function() {
    describe("eq", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:true() eq fn:true()'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:false() eq fn:false()'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:true() eq fn:false()'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:false() eq fn:true()'))
                .to.have.ordered.members([false]);
        });
    });

    describe("lt", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:true() lt fn:true()'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:false() lt fn:false()'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:true() lt fn:false()'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:false() lt fn:true()'))
                .to.have.ordered.members([true]);
        });
    });

    describe("gt", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:true() gt fn:true()'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:false() gt fn:false()'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:true() gt fn:false()'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:false() gt fn:true()'))
                .to.have.ordered.members([false]);
        });
    });
});