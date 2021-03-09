var xpath = require('./../../../api/xpath');
var expect = require('chai').expect;

describe("numeric", function() {
    describe("+", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('-4.5 + 6'))
                .to.have.ordered.members([1.5]);
        });
        it('', function() {
            expect(xpath.evaluate('6 + 4.5'))
                .to.have.ordered.members([10.5]);
        });
        // JS floating problem
        it('', function() {
            expect(xpath.evaluate('0.1 + 0.2'))
                .to.have.ordered.members([0.3]);
        });
        // TODO: operations on INF, NaN
    });

    describe("-", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('4.5 - 6'))
                .to.have.ordered.members([-1.5]);
        });
        it('', function() {
            expect(xpath.evaluate('6 - 4.5'))
                .to.have.ordered.members([1.5]);
        });
        // JS floating problem
        it('', function() {
            expect(xpath.evaluate('0.3 - 0.2'))
                .to.have.ordered.members([0.1]);
        });
        // TODO: operations on INF, NaN
    });

    describe("*", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('6 * 4.5'))
                .to.have.ordered.members([27]);
        });
        it('', function() {
            expect(xpath.evaluate('6 * -4.5'))
                .to.have.ordered.members([-27]);
        });
        it('', function() {
            expect(xpath.evaluate('-6 * 4.5'))
                .to.have.ordered.members([-27]);
        });
        it('', function() {
            expect(xpath.evaluate('-6 * -4.5'))
                .to.have.ordered.members([27]);
        });
        // JS floating problem
        it('', function() {
            expect(xpath.evaluate('0.2 * 0.4'))
                .to.have.ordered.members([0.08]);
        });
        // TODO: operations on INF, NaN, 0
    });

    describe("div", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('6 div 4'))
                .to.have.ordered.members([1.5]);
        });
        it('', function() {
            expect(xpath.evaluate('6 div -4'))
                .to.have.ordered.members([-1.5]);
        });
        it('', function() {
            expect(xpath.evaluate('-6 div 4'))
                .to.have.ordered.members([-1.5]);
        });
        it('', function() {
            expect(xpath.evaluate('-6 div -4'))
                .to.have.ordered.members([1.5]);
        });
        // JS floating problem
        it('', function() {
            expect(xpath.evaluate('0.3 div 0.4'))
                .to.have.ordered.members([0.75]);
        });
        // TODO: operations on INF, NaN, 0
    });

    describe("idiv", function() {
        it('', function() {
            expect(xpath.evaluate('10 idiv 3'))
                .to.have.ordered.members([3]);
        });
        it('', function() {
            expect(xpath.evaluate('3 idiv -2'))
                .to.have.ordered.members([-1]);
        });
        it('', function() {
            expect(xpath.evaluate('-3 idiv 2'))
                .to.have.ordered.members([-1]);
        });
        it('', function() {
            expect(xpath.evaluate('-3 idiv -2'))
                .to.have.ordered.members([1]);
        });
        it('', function() {
            expect(xpath.evaluate('9.0 idiv 3'))
                .to.have.ordered.members([3]);
        });
        it('', function() {
            expect(xpath.evaluate('-3.5 idiv 3'))
                .to.have.ordered.members([-1]);
        });
        it('', function() {
            expect(xpath.evaluate('3.0 idiv 4'))
                .to.have.ordered.members([0]);
        });
        it('', function() {
            expect(xpath.evaluate('3.1E1 idiv 6'))
                .to.have.ordered.members([5]);
        });
        it('', function() {
            expect(xpath.evaluate('3.1E1 idiv 7'))
                .to.have.ordered.members([4]);
        });
        // TODO: operations on INF, NaN, 0
    });

    describe("mod", function() {
        it('', function() {
            expect(xpath.evaluate('10 mod 3'))
                .to.have.ordered.members([1]);
        });
        it('', function() {
            expect(xpath.evaluate('6 mod -2'))
                .to.have.ordered.members([0]);
        });
        it('', function() {
            expect(xpath.evaluate('4.5 mod 1.2'))
                .to.have.ordered.members([0.9]);
        });
        it('', function() {
            expect(xpath.evaluate('1.23E2 mod 0.6E1'))
                .to.have.ordered.members([3.0E0]);
        });
        // JS floating problem
        it('', function() {
            expect(xpath.evaluate('4.5 mod 1.2'))
                .to.have.ordered.members([0.9]);
        });
        // TODO: operations on INF, NaN, 0
    });

    describe("+ (unary)", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('+2'))
                .to.have.ordered.members([2]);
        });
        it('', function() {
            expect(xpath.evaluate('+0.0E0'))
                .to.have.ordered.members([0.0E0]);
        });
        // TODO: operations on INF, NaN, 0
    });

    describe("eq", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('2 eq 2'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('2 eq 2e0'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('2 eq 3'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('4 eq 2'))
                .to.have.ordered.members([false]);
        });
        // TODO: operations on INF, NaN, 0
    });

    describe("lt", function() {
        it('', function() {
            expect(xpath.evaluate('2 lt 2'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('2 lt 2e0'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('2 lt 3'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('4 lt 2'))
                .to.have.ordered.members([false]);
        });
        // TODO: operations on INF, NaN
    });

    describe("gt", function() {
        it('', function() {
            expect(xpath.evaluate('2 gt 2'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('2 gt 2e0'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('2 gt 3'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('4 gt 2'))
                .to.have.ordered.members([true]);
        });
        // TODO: operations on INF, NaN
    });

    describe("le", function() {
        it('', function() {
            expect(xpath.evaluate('2 le 2'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('2 le 2e0'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('2 le 3'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('4 le 2'))
                .to.have.ordered.members([false]);
        });
        // TODO: operations on INF, NaN
    });

    describe("gt", function() {
        it('', function() {
            expect(xpath.evaluate('2 ge 2'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('2 ge 2e0'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('2 ge 3'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('4 ge 2'))
                .to.have.ordered.members([true]);
        });
        // TODO: operations on INF, NaN
    });
});