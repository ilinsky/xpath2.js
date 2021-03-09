var xpath = require('./../../../api/xpath');
var expect = require('chai').expect;

describe("numeric", function() {
    describe("abs()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:abs(10.5)'))
                .to.have.ordered.members([10.5]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:abs(-10.5)'))
                .to.have.ordered.members([10.5]);
        });
    });

    describe("", function() {
        it('', function() {
            expect(xpath.evaluate('fn:ceiling(10.5)'))
                .to.have.ordered.members([11]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:ceiling(-10.5)'))
                .to.have.ordered.members([-10]);
        });
        // Not W3C test
        it('', function() {
            expect(xpath.evaluate('fn:ceiling(-0)'))
                .to.have.ordered.members([-0]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:ceiling(-0.5)'))
                .to.have.ordered.members([-0]);
        });
    });

    describe("floor()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:floor(10.5)'))
                .to.have.ordered.members([10]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:floor(-10.5)'))
                .to.have.ordered.members([-11]);
        });
    });

    describe("round()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:round(2.5)'))
                .to.have.ordered.members([3]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round(2.4999)'))
                .to.have.ordered.members([2]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round(-2.5)'))
                .to.have.ordered.members([-2]);
        });
    });

    describe("round-half-to-even()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(0.5)'))
                .to.have.ordered.members([0]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(1.5)'))
                .to.have.ordered.members([2]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(2.5)'))
                .to.have.ordered.members([2]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(3.567812E+3, 2)'))
                .to.have.ordered.members([3567.81E0]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(4.7564E-3, 2)'))
                .to.have.ordered.members([0.0E0]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(35612.25, -2)'))
                .to.have.ordered.members([35600]);
        });
        // Not W3C test
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(-3.4)'))
                .to.have.ordered.members([-3]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(-3.5)'))
                .to.have.ordered.members([-4]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(-3.6)'))
                .to.have.ordered.members([-4]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(-4.4)'))
                .to.have.ordered.members([-4]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(-4.5)'))
                .to.have.ordered.members([-4]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(-4.6)'))
                .to.have.ordered.members([-5]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(3.4)'))
                .to.have.ordered.members([3]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(3.5)'))
                .to.have.ordered.members([4]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(3.6)'))
                .to.have.ordered.members([4]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(4.4)'))
                .to.have.ordered.members([4]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(4.5)'))
                .to.have.ordered.members([4]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(4.6)'))
                .to.have.ordered.members([5]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(35540, -2)'))
                .to.have.ordered.members([35500]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(35550, -2)'))
                .to.have.ordered.members([35600]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(35560, -2)'))
                .to.have.ordered.members([35600]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(-150.0150, -2)'))
                .to.have.ordered.members([-200]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(150.0150, -2)'))
                .to.have.ordered.members([200]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(150.0150, 2)'))
                .to.have.ordered.members([150.02]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(-150.0150, 2)'))
                .to.have.ordered.members([-150.02]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(15001.50)'))
                .to.have.ordered.members([15002]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:round-half-to-even(-15001.50)'))
                .to.have.ordered.members([-15002]);
        });
    });
});