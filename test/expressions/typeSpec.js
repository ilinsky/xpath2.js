var xpath = require('./../../api/xpath');
var expect = require('chai').expect;

var mockDocument = require('./../mockDocument');

describe("type", function() {
    describe("cast", function() {
        it('', function() {
            expect(xpath.evaluate('1 cast as xs:boolean'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('"false" cast as xs:boolean'))
                .to.have.ordered.members([false]);
        });
    });

    describe("cast cardinality", function() {
        it('', function() {
            expect(xpath.evaluate('fn:true() cast as xs:decimal'))
                .to.have.ordered.members([1]);
        });
        it('', function() {
            expect(xpath.evaluate('(fn:true()) cast as xs:decimal'))
                .to.have.ordered.members([1]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:true() cast as xs:decimal?'))
                .to.have.ordered.members([1]);
        });
        it('', function() {
            expect(xpath.evaluate('() cast as xs:decimal?'))
                .to.have.ordered.members([]);
        });
    });

    describe("castable", function() {
        it('', function() {
            expect(xpath.evaluate('1 castable as xs:boolean'))
                .to.have.ordered.members([true]);
        });

        it('XPST0051', function() {
            expect(function(){xpath.evaluate('1 castable as xs:integers')})
                .to.throw(xpath.classes.Exception, 'Unknown atomic type xs:integers');
        });
        it('XPST0080', function() {
            expect(function(){xpath.evaluate('1 castable as xs:anyAtomicType')})
                .to.throw(xpath.classes.Exception, 'No value is castable to xs:anyAtomicType');
        });
        it('XPST0080', function() {
            expect(function(){xpath.evaluate('1 castable as xs:NOTATION')})
                .to.throw(xpath.classes.Exception, 'No value is castable to xs:NOTATION');
        });
    });

    describe("castable cardinality", function() {
        it('', function() {
            expect(xpath.evaluate('() castable as xs:integer'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('() castable as xs:integer?'))
                .to.have.ordered.members([true]);
        });
    });

    describe("instance of", function() {
        it('', function() {
            expect(xpath.evaluate('fn:true() instance of xs:boolean'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('1 instance of xs:boolean'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('1 instance of xs:integer'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('1.0 instance of xs:decimal'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('1e2 instance of xs:double'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('1 instance of xs:double'))
                .to.have.ordered.members([false]);
        });
        // Kind tests
        it('', function() {
            expect(xpath.evaluate('(1) instance of item()'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('() instance of item()'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('. instance of node()', mockDocument))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('. instance of document-node()', mockDocument))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('test-element instance of document-node()', mockDocument))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('test-element instance of document-node()', mockDocument))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('test-element instance of document-node()', mockDocument))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('test-element instance of element()', mockDocument))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('test-element/attribute::test-attribute instance of attribute()', mockDocument))
                .to.have.ordered.members([true]);
        });
    });

    describe("instance of empty-sequence()", function() {
        it('', function() {
            expect(xpath.evaluate('(1) instance of empty-sequence()'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('() instance of empty-sequence()'))
                .to.have.ordered.members([true]);
        });
    });

    describe("instance of with cardinality", function() {
        it('', function() {
            expect(xpath.evaluate('"0" instance of xs:string'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('"0" instance of xs:string?'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('"0" instance of xs:string+'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('"0" instance of xs:string*'))
                .to.have.ordered.members([true]);
        });
        //
        it('', function() {
            expect(xpath.evaluate('("0") instance of xs:string'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('("0") instance of xs:string?'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('("0") instance of xs:string+'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('("0") instance of xs:string*'))
                .to.have.ordered.members([true]);
        });
        //
        it('', function() {
            expect(xpath.evaluate('("0", "1") instance of xs:string'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('("0", "1") instance of xs:string?'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('("0", "1") instance of xs:string+'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('("0", "1") instance of xs:string*'))
                .to.have.ordered.members([true]);
        });
        //
        it('', function() {
            expect(xpath.evaluate('() instance of xs:string'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('() instance of xs:string?'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('() instance of xs:string+'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('() instance of xs:string*'))
                .to.have.ordered.members([true]);
        });
    });

    describe("treat as", function() {
        it('', function() {
            expect(xpath.evaluate('fn:true() treat as xs:boolean'))
                .to.have.ordered.members([true]);
        });
    });
});