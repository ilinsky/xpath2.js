var xpath = require('./../../../api/xpath');
var expect = require('chai').expect;

var nodeOperatorsTestDocument = require('./../../nodeTestDocument');

describe("node", function() {
    describe("is", function() {
        it('', function() {
            expect(xpath.evaluate('fn:id("test") is fn:id("test_3")/parent::element()', nodeOperatorsTestDocument))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("test") is fn:id("test_3")', nodeOperatorsTestDocument))
                .to.have.ordered.members([false]);
        });
    });

    describe("<<", function() {
        // Before
        it('', function() {
            expect(xpath.evaluate('fn:id("test_1") << fn:id("test_3")', nodeOperatorsTestDocument))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("test_1") << fn:id("test_2")', nodeOperatorsTestDocument))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("test_2") << fn:id("test_3")', nodeOperatorsTestDocument))
                .to.have.ordered.members([true]);
        });
        // Equals
        it('', function() {
            expect(xpath.evaluate('fn:id("test_3") << fn:id("test_3")', nodeOperatorsTestDocument))
                .to.have.ordered.members([false]);
        });
        // After
        it('', function() {
            expect(xpath.evaluate('fn:id("test_3") << fn:id("test_1")', nodeOperatorsTestDocument))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("test_2") << fn:id("test_1")', nodeOperatorsTestDocument))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("test_3") << fn:id("test_2")', nodeOperatorsTestDocument))
                .to.have.ordered.members([false]);
        });
    });

    describe(">>", function() {
        // Before
        it('', function() {
            expect(xpath.evaluate('fn:id("test_1") >> fn:id("test_3")', nodeOperatorsTestDocument))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("test_1") >> fn:id("test_2")', nodeOperatorsTestDocument))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("test_2") >> fn:id("test_3")', nodeOperatorsTestDocument))
                .to.have.ordered.members([false]);
        });
        // Equals
        it('', function() {
            expect(xpath.evaluate('fn:id("test_3") >> fn:id("test_3")', nodeOperatorsTestDocument))
                .to.have.ordered.members([false]);
        });
        // After
        it('', function() {
            expect(xpath.evaluate('fn:id("test_3") >> fn:id("test_1")', nodeOperatorsTestDocument))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("test_2") >> fn:id("test_1")', nodeOperatorsTestDocument))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("test_3") >> fn:id("test_2")', nodeOperatorsTestDocument))
                .to.have.ordered.members([true]);
        });
    });

});