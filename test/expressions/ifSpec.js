var xpath = require('./../../lib');
var expect = require('chai').expect;

describe("if", function() {
    it('', function() {
        expect(xpath.evaluate("if (1) then 3 else 4"))
            .to.have.ordered.members([3]);
    });
    it('', function() {
        expect(xpath.evaluate("if (0) then 3 else 4"))
            .to.have.ordered.members([4]);
    });
    it('', function() {
        expect(xpath.evaluate("if (fn:true()) then 3 else 4"))
            .to.have.ordered.members([3]);
    });
    it('', function() {
        expect(xpath.evaluate("if (fn:false()) then 3 else 4"))
            .to.have.ordered.members([4]);
    });
    it('', function() {
        expect(xpath.evaluate('if ("0") then 3 else 4'))
            .to.have.ordered.members([3]);
    });
    it('', function() {
        expect(xpath.evaluate('if ("") then 3 else 4'))
            .to.have.ordered.members([4]);
    });
});