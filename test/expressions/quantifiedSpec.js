var xpath = require('./../../api/xpath');
var expect = require('chai').expect;

describe("quantified", function() {
    describe("every satisfies", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('every $a in (1, 2, 3, 4, 5) satisfies $a < 3'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('every $a in (1, 2, 3, 4, 5) satisfies $a < 6'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('every $a in (1, 2, 3, 4, 5) satisfies $a > 6'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('every $a in () satisfies $a < 3'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('every $a in 1 satisfies $a < 3'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('every $a in 5 satisfies $a < 3'))
                .to.have.ordered.members([false]);
        });
    });

    describe("some satisfies", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('some $a in (1, 2, 3, 4, 5) satisfies $a < 3'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('some $a in (1, 2, 3, 4, 5) satisfies $a < 6'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('some $a in (1, 2, 3, 4, 5) satisfies $a > 6'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('some $a in () satisfies $a < 3'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('some $a in 1 satisfies $a < 3'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('some $a in 5 satisfies $a < 3'))
                .to.have.ordered.members([false]);
        });
    });});