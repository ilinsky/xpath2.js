var xpath = require('./../../src');
var expect = require('chai').expect;

describe("binary", function() {
    describe("xs:hexBinary eq xs:hexBinary", function() {
        it('', function() {
            expect(xpath.evaluate("xs:hexBinary('aaaa') eq xs:hexBinary('AAAA')"))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate("xs:hexBinary('aaaa') eq xs:hexBinary('AA')"))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate("xs:hexBinary('aaaa') eq xs:hexBinary('')"))
                .to.have.ordered.members([false]);
        });
    });

    describe("xs:base64Binary eq xs:base64Binary", function() {
        it('', function() {
            expect(xpath.evaluate("xs:base64Binary('qg==') eq xs:base64Binary('qg==')"))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate("xs:base64Binary('wg==') eq xs:base64Binary('qg==')"))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate("xs:base64Binary('qg==') eq xs:base64Binary('')"))
                .to.have.ordered.members([false]);
        });
    });
});