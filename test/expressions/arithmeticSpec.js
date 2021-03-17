var xpath = require('./../../lib');
var expect = require('chai').expect;

describe("arithmetics", function() {
    describe("+", function() {
        it('', function() {
            expect(xpath.evaluate("3 + 2")[0])
                .to.equal(5);
        });
    });

    describe("-", function() {
        it('', function() {
            expect(xpath.evaluate("2 - 3")[0])
                .to.equal(-1);
        });
    });

    describe("unary", function() {
        it('', function() {
            expect(xpath.evaluate("-2")[0])
                .to.equal(-2);
        });
        it('', function() {
            expect(xpath.evaluate("+2")[0])
                .to.equal(2);
        });
    });

    describe("*", function() {
        it('', function() {
            expect(xpath.evaluate("2 * 3")[0])
                .to.equal(6);
        });
        it('', function() {
            expect(xpath.evaluate("2 * 3 * 4")[0])
                .to.equal(24);
        });
        it('', function() {
            expect(xpath.evaluate("2 *-3")[0])
                .to.equal(-6);
        });
    });

    describe("div", function() {
        it('', function() {
            expect(xpath.evaluate("6 div 3")[0])
                .to.equal(2);
        });
        it('', function() {
            expect(xpath.evaluate("6 div 3 div 2")[0])
                .to.equal(1);
        });
        it('', function() {
            expect(xpath.evaluate("1 div 2")[0])
                .to.equal(0.5);
        });
    });

    describe("idiv", function() {
        it('', function() {
            expect(xpath.evaluate("5 idiv 3")[0])
                .to.equal(1);
        });
    });

    describe("mod", function() {
        it('', function() {
            expect(xpath.evaluate("5 mod 3")[0])
                .to.equal(2);
        });
    });

    // Test evaluation order
    it('', function() {
        expect(xpath.evaluate("3 + 2 - 4")[0])
            .to.equal(1);
    });

    it('', function() {
        expect(xpath.evaluate("3 * 4 + 2")[0])
            .to.equal(14);
    });
    it('', function() {
        expect(xpath.evaluate("3 * (4 + 2)")[0])
            .to.equal(18);
    });
    it('', function() {
        expect(xpath.evaluate("3 + 2 * 4")[0])
            .to.equal(11);
    });
    // Misc
    it('', function() {
        expect(xpath.evaluate("0.1 + 0.2")[0])
            .to.equal(0.3);
    });
});
