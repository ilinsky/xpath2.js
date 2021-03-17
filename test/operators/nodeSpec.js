var xpath = require('./../../lib');
var expect = require('chai').expect;

var mockDocument = require('./../mockMiniDocument');

describe("node", function() {
    describe("is", function() {
        it('', function() {
            expect(xpath.evaluate('fn:id("test") is fn:id("test_3")/parent::element()', mockDocument))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("test") is fn:id("test_3")', mockDocument))
                .to.have.ordered.members([false]);
        });
    });

    describe("<<", function() {
        // Before
        it('', function() {
            expect(xpath.evaluate('fn:id("test_1") << fn:id("test_3")', mockDocument))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("test_1") << fn:id("test_2")', mockDocument))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("test_2") << fn:id("test_3")', mockDocument))
                .to.have.ordered.members([true]);
        });
        // Equals
        it('', function() {
            expect(xpath.evaluate('fn:id("test_3") << fn:id("test_3")', mockDocument))
                .to.have.ordered.members([false]);
        });
        // After
        it('', function() {
            expect(xpath.evaluate('fn:id("test_3") << fn:id("test_1")', mockDocument))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("test_2") << fn:id("test_1")', mockDocument))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("test_3") << fn:id("test_2")', mockDocument))
                .to.have.ordered.members([false]);
        });
    });

    describe(">>", function() {
        // Before
        it('', function() {
            expect(xpath.evaluate('fn:id("test_1") >> fn:id("test_3")', mockDocument))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("test_1") >> fn:id("test_2")', mockDocument))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("test_2") >> fn:id("test_3")', mockDocument))
                .to.have.ordered.members([false]);
        });
        // Equals
        it('', function() {
            expect(xpath.evaluate('fn:id("test_3") >> fn:id("test_3")', mockDocument))
                .to.have.ordered.members([false]);
        });
        // After
        it('', function() {
            expect(xpath.evaluate('fn:id("test_3") >> fn:id("test_1")', mockDocument))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("test_2") >> fn:id("test_1")', mockDocument))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("test_3") >> fn:id("test_2")', mockDocument))
                .to.have.ordered.members([true]);
        });
    });

});