var xpath = require('./../../src');
var expect = require('chai').expect;

describe("trace", function() {
    describe("trace()", function() {
        it('', function() {
            // TODO: Also check if global console.log was called
            expect(xpath.evaluate('fn:trace(7, "")'))
                .to.have.ordered.members([7]);
        });
    });
});