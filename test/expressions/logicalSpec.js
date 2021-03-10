var xpath = require('./../../src');
var expect = require('chai').expect;

describe("logical", function() {
    describe("and", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('1 and fn:false()'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('1 and fn:true()'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('1 and 0'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('1 and 1'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('1 and ""'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('1 and "string"'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('1 and (1)'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('1 and ()'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:false() and ()'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('0 and ""'))
                .to.have.ordered.members([false]);
        });

        it('', function() {
            expect(xpath.evaluate('fn:false() and 1'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:true() and 1'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('0 and 1'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('1 and 1'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('"" and 1'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('"string" and 1'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('(1) and 1'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('() and 1'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('() and fn:false()'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('"" and 0'))
                .to.have.ordered.members([false]);
        });
    });

    describe("and and", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('0 and fn:false() and ""'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('0 and fn:false() and "string"'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('0 and fn:true() and ""'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('1 and fn:true() and "string"'))
                .to.have.ordered.members([true]);
        });
    });

    describe("or", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('1 or fn:false()'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('1 or fn:true()'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('1 or 0'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('1 or 1'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('1 or ""'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('1 or "string"'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('1 or (1)'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('1 or ()'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:false() or ()'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('0 or ""'))
                .to.have.ordered.members([false]);
        });

        it('', function() {
            expect(xpath.evaluate('fn:false() or 1'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:true() or 1'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('0 or 1'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('1 or 1'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('"" or 1'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('"string" or 1'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('(1) or 1'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('() or 1'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('() or fn:false()'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('"" or 0'))
                .to.have.ordered.members([false]);
        });
    });

    describe("or or", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('0 or fn:false() or ""'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('0 or fn:false() or "string"'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('0 or fn:true() or ""'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('1 or fn:true() or "string"'))
                .to.have.ordered.members([true]);
        });
    });
});