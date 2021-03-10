var xpath = require('./../../api/xpath');
var expect = require('chai').expect;

var mockDocument = require('./../mockNanoDocument');

describe("qname", function() {
    describe("resolve-QName()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:prefix-from-QName(fn:resolve-QName("hello", /child::element()))', mockDocument))
                .to.have.ordered.members([]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:local-name-from-QName(fn:resolve-QName("hello", /child::element()))', mockDocument))
                .to.have.ordered.members(['hello']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:namespace-uri-from-QName(fn:resolve-QName("hello", /child::element()))', mockDocument))
                .to.have.ordered.members(['']);
        });
        // TODO: Check why these tests were commented out earlier
//        it('', function() {
//            expect(xpath.evaluate('fn:prefix-from-QName(fn:resolve-QName("eg:myFunc", /child::element()))'))
//                .to.have.ordered.members([]);
//        });
//        it('', function() {
//            expect(xpath.evaluate('fn:local-name-from-QName(fn:resolve-QName("eg:myFunc", /child::element()))'))
//                .to.have.ordered.members(['hello']);
//        });
//        it('', function() {
//            expect(xpath.evaluate('fn:namespace-uri-from-QName(fn:resolve-QName("eg:myFunc", /child::element()))'))
//                .to.have.ordered.members(['http://www.w3.org/1999/xhtml']);
//        });
    });

    describe("QName()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:prefix-from-QName(fn:QName("http://www.example.com/example", "person"))'))
                .to.have.ordered.members([]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:local-name-from-QName(fn:QName("http://www.example.com/example", "person"))'))
                .to.have.ordered.members(['person']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:namespace-uri-from-QName(fn:QName("http://www.example.com/example", "person"))'))
                .to.have.ordered.members(['http://www.example.com/example']);
        });
        // TODO: Check why these tests were commented out earlier
//        it('', function() {
//            expect(xpath.evaluate('fn:prefix-from-QName(fn:QName("http://www.example.com/example", "ht:person"))'))
//                .to.have.ordered.members(['ht']);
//        });
//        it('', function() {
//            expect(xpath.evaluate('fn:local-name-from-QName(fn:QName("http://www.example.com/example", "ht:person"))'))
//                .to.have.ordered.members(['person']);
//        });
//        it('', function() {
//            expect(xpath.evaluate('fn:namespace-uri-from-QName(fn:QName("http://www.example.com/example", "ht:person"))'))
//                .to.have.ordered.members(['http://www.example.com/example']);
//        });
    });

    describe("prefix-from-QName()", function() {
        // Not W3c test
        it('', function() {
            expect(xpath.evaluate('fn:prefix-from-QName(fn:QName("http://www.example.com/example", "fn:person"))'))
                .to.have.ordered.members(['fn']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:prefix-from-QName(fn:QName("http://www.example.com/example", "person"))'))
                .to.have.ordered.members([]);
        });
    });

    describe("local-name-from-QName()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:local-name-from-QName(fn:QName("http://www.example.com/example", "person"))'))
                .to.have.ordered.members(['person']);
        });
    });

    describe("namespace-uri-from-QName()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:namespace-uri-from-QName(fn:QName("http://www.example.com/example", "person"))'))
                .to.have.ordered.members(['http://www.example.com/example']);
        });
    });

    describe("namespace-uri-for-prefix()", function() {
        // Not W3C test
        it('', function() {
            expect(xpath.evaluate('fn:namespace-uri-for-prefix("", /child::element())', mockDocument))
                .to.have.ordered.members([]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:namespace-uri-for-prefix((), /child::element())', mockDocument))
                .to.have.ordered.members([]);
        });
    });

    // Not implemented
    xdescribe("in-scope-prefixes()", function() {
        // Not W3C test
        it('', function() {
            expect(xpath.evaluate('fn:in-scope-prefixes(/child::element())', mockDocument))
                .to.have.ordered.members([]);
        });
    });
});