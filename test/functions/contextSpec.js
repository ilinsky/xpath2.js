var xpath = require('./../../lib');
var expect = require('chai').expect;

describe("context", function() {
    describe("position()", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('(1, 2, 3)[fn:position() = 2]'))
                .to.have.ordered.members([2]);
        });
    });
    describe("last()", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('(1, 2, 3)[fn:last()]'))
                .to.have.ordered.members([3]);
        });
    });
    describe("current-dateTime() / current-time() / current-date()", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:current-dateTime() cast as xs:date eq fn:current-date()'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:current-dateTime() cast as xs:time eq fn:current-time()'))
                .to.have.ordered.members([true]);
        });
    });

    describe("implicit-timezone()", function() {
        var offset	= new Date().getTimezoneOffset(),
            sign	= offset < 0,
            hours	= ~~(Math.abs(offset) / 60),
            minutes	= Math.abs(offset) % 60;

        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:implicit-timezone())'))
                .to.have.ordered.members([(sign ? '' : '-') + "PT" + (hours ? hours + "H" : '') + (minutes ? minutes + "M" : '') + (hours || minutes ? '' : "0S")]);
        });
    });

    describe("default-collation()", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:default-collation()'))
                .to.have.ordered.members(['http://www.w3.org/2005/xpath-functions/collation/codepoint']);
        });
    });

    describe("static-base-uri()", function() {
        // Not W3C tests
        // TODO: Check test
        it('', function() {
            expect(xpath.evaluate('fn:static-base-uri()'))
                .to.have.ordered.members(['']);
        });
    });
});