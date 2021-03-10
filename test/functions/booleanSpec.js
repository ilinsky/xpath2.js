var xpath = require('./../../api/xpath');
var expect = require('chai').expect;

describe("boolean", function() {
    describe("true()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:true()'))
                .to.have.ordered.members([true]);
        });
    });

    describe("false()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:false()'))
                .to.have.ordered.members([false]);
        });
    });

    describe("not()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:not(fn:true())'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:not("false")'))
                .to.have.ordered.members([false]);
        });
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:not(fn:false())'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:not("true")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:not("")'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:not(())'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:not("1")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:not("0")'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:not(1)'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:not(0)'))
                .to.have.ordered.members([true]);
        });
    });
});