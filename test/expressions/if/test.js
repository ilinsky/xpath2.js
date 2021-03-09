var xpath = require('./../../../api/xpath.js');
var expect = require('chai').expect;

describe("if", function() {
    it('testIf_NumberInClause_Positive', function() {
        expect(xpath.evaluate("if (1) then 3 else 4")).to.have.ordered.members([3]);
    });
    it('testIf_NumberInClause_Negative', function() {
        expect(xpath.evaluate("if (0) then 3 else 4")).to.have.ordered.members([4]);
    });
    it('testIf_BooleanInClause_Positive', function() {
        expect(xpath.evaluate("if (fn:true()) then 3 else 4")).to.have.ordered.members([3]);
    });
    it('testIf_BooleanInClause_Negative', function() {
        expect(xpath.evaluate("if (fn:false()) then 3 else 4")).to.have.ordered.members([4]);
    });
    it('testIf_StringInClause_Positive', function() {
        expect(xpath.evaluate('if ("0") then 3 else 4')).to.have.ordered.members([3]);
    });
    it('testForSingleClause', function() {
        expect(xpath.evaluate('if ("") then 3 else 4')).to.have.ordered.members([4]);
    });
});