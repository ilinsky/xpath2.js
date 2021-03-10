var xpath = require('./../../api/xpath');
var expect = require('chai').expect;

describe("anyuri", function() {
    describe("resolve-uri", function() {
        // Not W3c test
        // 1 arg
        // TODO: write 1 arg tests
        // 2 args
        it('', function() {
            expect(xpath.evaluate('fn:resolve-uri("index.html", "http://www.ilinsky.com/articles/XMLHttpRequest/")'))
                .to.have.ordered.members(['http://www.ilinsky.com/articles/XMLHttpRequest/index.html']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:resolve-uri("../../index.html", "http://www.ilinsky.com/articles/XMLHttpRequest/")'))
                .to.have.ordered.members(["http://www.ilinsky.com/index.html"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:resolve-uri("/index.html", "http://www.ilinsky.com/articles/XMLHttpRequest/")'))
                .to.have.ordered.members(['http://www.ilinsky.com/index.html']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:resolve-uri("http://localhost/index.html", "http://www.ilinsky.com/articles/XMLHttpRequest/")'))
                .to.have.ordered.members(["http://localhost/index.html"]);
        });
    });
});