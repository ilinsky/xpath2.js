var xpath = require('./../../../api/xpath');
var expect = require('chai').expect;

describe("arithmetics", function() {
    it('testAdditiveAdd', function() {
        expect(xpath.evaluate("3 + 2")[0]).to.equal(5);
    });
    it('testAdditiveSub', function() {
        expect(xpath.evaluate("2 - 3")[0]).to.equal(-1);
    });
    it('testAdditiveAddSub', function() {
        expect(xpath.evaluate("3 + 2 - 4")[0]).to.equal(1);
    });
    it('testUnaryMinus', function() {
        expect(xpath.evaluate("-2")[0]).to.equal(-2);
    });
    it('testUnaryPlus', function() {
        expect(xpath.evaluate("+2")[0]).to.equal(2);
    });
    it('testMultiplicativeMul', function() {
        expect(xpath.evaluate("2 * 3")[0]).to.equal(6);
    });
    it('testMultiplicativeMulMul', function() {
        expect(xpath.evaluate("2 * 3 * 4")[0]).to.equal(24);
    });
    it('testMultiplicativeMulNegative', function() {
        expect(xpath.evaluate("2 *-3")[0]).to.equal(-6);
    });
    it('testMultiplicativeDiv', function() {
        expect(xpath.evaluate("6 div 3")[0]).to.equal(2);
    });
    it('testMultiplicativeDivDiv', function() {
        expect(xpath.evaluate("6 div 3 div 2")[0]).to.equal(1);
    });
    it('testMultiplicativeDivDouble', function() {
        expect(xpath.evaluate("1 div 2")[0]).to.equal(0.5);
    });
    it('testMultiplicativeIdiv', function() {
        expect(xpath.evaluate("5 idiv 3")[0]).to.equal(1);
    });
    it('testMultiplicativeMod', function() {
        expect(xpath.evaluate("5 mod 3")[0]).to.equal(2);
    });
    // Test evaluation order
    it('testOrderMulAdd', function() {
        expect(xpath.evaluate("3 * 4 + 2")[0]).to.equal(14);
    });
    it('testOrderMulAddInBrackets', function() {
        expect(xpath.evaluate("3 * (4 + 2)")[0]).to.equal(18);
    });
    it('testOrderAddMul', function() {
        expect(xpath.evaluate("3 + 2 * 4")[0]).to.equal(11);
    });
    // Misc
    it('testAdditiveDouble', function() {
        expect(xpath.evaluate("0.1 + 0.2")[0]).to.equal(0.3);
    });
});
