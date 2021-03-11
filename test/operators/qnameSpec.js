var xpath = require('./../../src');
var expect = require('chai').expect;

describe("qname", function() {
    describe("eq", function() {
        // Not W3C tests
        it('', function() {
            // Not W3C tests
            expect(xpath.evaluate('xs:QName("aa:cc") eq xs:QName("bb:cc")'))
                .to.have.ordered.members([true]);
        });
    });
});