var xpath = require('./../../../api/xpath.js');
var expect = require('chai').expect;

describe("for", function() {
    it('testForSingleClause', function() {
        expect(xpath.evaluate("for $a in (1, 2) return $a * 2")).to.have.ordered.members([2,4]);
    });
    it('testForDoubleClause', function() {
        expect(xpath.evaluate("for $a in (1, 2), $b in (3, 4) return $a * $b")).to.have.ordered.members([3, 4, 6, 8]);
    });
    it('testForDoubleClause', function() {
        expect(xpath.evaluate("for $a in (1, 2), $b in (3, 4) return $a * $b")).to.have.ordered.members([3, 4, 6, 8]);
    });
    it('testForSingleSingleClause', function() {
        expect(xpath.evaluate("for $a in (1, 2) return for $b in (3, 4) return $a * $b")).to.have.ordered.members([3, 4, 6, 8]);
    });
    it('testForDoubleClauseFirstVariableInSecondClause', function() {
        expect(xpath.evaluate("for $a in (1, 2), $b in ($a, 3, 4) return $a * $b")).to.have.ordered.members([1, 3, 4, 4, 6, 8]);
    });
    it('testForDoubleClauseSecondVariableInFirstClause', function() {
        expect(function(){xpath.evaluate("for $a in (1, 2, $b), $b in (3, 4) return $a * $b")}).to.throw(xpath.classes.Exception, "Variable $b has not been declared");
    });
});
