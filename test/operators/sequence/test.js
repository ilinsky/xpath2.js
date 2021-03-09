var xpath = require('./../../../api/xpath.js');
var expect = require('chai').expect;

var mockDocument = require('./../../nodeTestDocument');

describe("sequence", function() {
    describe("concatenate items", function() {
        it('', function() {
            expect(xpath.evaluate('1, 2, 3, 4'))
                .to.have.ordered.members([1, 2, 3, 4]);
        });
    });

    describe("concatenate sequences", function() {
        it('', function() {
            expect(xpath.evaluate('(1, 2), (3, 4)'))
                .to.have.ordered.members([1, 2, 3, 4]);
        });
    });

    describe("concatenate mixed", function() {
        it('', function() {
            expect(xpath.evaluate('1, (2, (3, 4), 5), 6'))
                .to.have.ordered.members([1, 2, 3, 4, 5, 6]);
        });
    });

    describe("union", function() {
        it('', function() {
            expect(xpath.evaluate('descendant-or-self::*[@id="test_1"] | descendant-or-self::*[@id="test_2"] | descendant-or-self::*[@id="test_3"]', mockDocument))
                .to.have.ordered.members([mockDocument.getElementById("test_1"), mockDocument.getElementById("test_2"), mockDocument.getElementById("test_3")]);
        });
    });

    describe("union (mixed)", function() {
        it('', function() {
            expect(function(){xpath.evaluate('descendant-or-self::*[@id="test_1"] | 2 | descendant-or-self::*[@id="test_3"]', mockDocument)})
                .to.throw(xpath.classes.Exception, 'Required item type of second operand of \'union\' is node()');
        });
    });

    describe("union uniqueness", function() {
        it('', function() {
            expect(xpath.evaluate('descendant-or-self::*[@id="test_1"] | descendant-or-self::*[@id="test_2"] | descendant-or-self::*[@id="test_3"] | descendant-or-self::*[@id="test_2"] | descendant-or-self::*[@id="test_1"]', mockDocument))
                .to.have.ordered.members([mockDocument.getElementById("test_1"), mockDocument.getElementById("test_2"), mockDocument.getElementById("test_3")]);
        });
    });

    describe("intersect", function() {
        it('', function() {
            expect(xpath.evaluate('(descendant-or-self::*[@id="test_1"] | descendant-or-self::*[@id="test_2"]) intersect (descendant-or-self::*[@id="test_2"] | descendant-or-self::*[@id="test_3"])', mockDocument))
                .to.have.ordered.members([mockDocument.getElementById("test_2")]);
        });
    });

    describe("except", function() {
        it('', function() {
            expect(xpath.evaluate('(descendant-or-self::*[@id="test_1"] | descendant-or-self::*[@id="test_2"]) except (descendant-or-self::*[@id="test_2"] | descendant-or-self::*[@id="test_3"])', mockDocument))
                .to.have.ordered.members([mockDocument.getElementById("test_1")]);
        });
    });

    describe("to", function() {
        it('', function() {
            expect(xpath.evaluate('1 to 5'))
                .to.have.ordered.members([1, 2, 3, 4, 5]);
        });
        it('', function() {
            expect(xpath.evaluate('-2 to 2'))
                .to.have.ordered.members([-2, -1, 0, 1, 2]);
        });
        it('', function() {
            expect(xpath.evaluate('0 to 0'))
                .to.have.ordered.members([0]);
        });
        it('', function() {
            expect(xpath.evaluate('5 to 4'))
                .to.have.ordered.members([]);
        });
        it('', function() {
            expect(xpath.evaluate('-5 to ()'))
                .to.have.ordered.members([]);
        });
        it('', function() {
            expect(xpath.evaluate('() to 5'))
                .to.have.ordered.members([]);
        });
        // TODO: Check exception text
        xit('', function() {
            expect(function(){xpath.evaluate('1 to 5.5')})
                .to.throw(xpath.classes.Exception, '');
        });
        xit('', function() {
            expect(function(){xpath.evaluate('1.5 to 5')})
                to.throw(xpath.classes.Exception, '');
        });
    });
});