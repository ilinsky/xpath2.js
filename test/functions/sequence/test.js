var xpath = require('./../../../api/xpath');
var expect = require('chai').expect;

var mockDocument = require('./../../mockDocument');

describe("sequence", function() {
    describe("boolean()", function() {
        it('', function() {
            expect(function(){xpath.evaluate('fn:boolean(("a", "b", "c"))')})
                .to.throw(xpath.classes.Exception, 'Effective boolean value is not defined for a sequence of two or more items');
        });
        it('', function() {
            expect(xpath.evaluate('fn:boolean(("a", "b", "c")[1])'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:boolean(("a", "b", "c")[0])'))
                .to.have.ordered.members([false]);
        });
    });

    describe("index-of()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:index-of((10, 20, 30, 40), 35)'))
                .to.have.ordered.members([]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:index-of((10, 20, 30, 30, 20, 10), 20)'))
                .to.have.ordered.members([2, 5]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:index-of(("a", "sport", "and", "a", "pastime"), "a")'))
                .to.have.ordered.members([1, 4]);
        });
    });

    describe("index-of() with collation", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:index-of (("a", "sport", "and", "a", "pastime"), "a", "CollationA")'))
                .to.have.ordered.members([1, 4]);
        });
    });

    describe("empty()", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:empty((1, 2, 3))'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:empty(())'))
                .to.have.ordered.members([true]);
        });
    });

    describe("exists()", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:exists((1, 2, 3))'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:exists(())'))
                .to.have.ordered.members([false]);
        });
    });

    describe("distinct-values()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:distinct-values((5, 4, 5, 3, 2, 3, 2, 1))'))
                .to.have.ordered.members([5, 4, 3, 2, 1]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:distinct-values(("", fn:true(), 1, fn:true(), 0, fn:false(), 1, "", 0, fn:false()))'))
                .to.have.ordered.members(["", true, 1, 0, false]);
        });
    });

    // FIXME: Enable when implemented
    xdescribe("distinct-values() with collation", function() {
        it('', function() {
            expect(xpath.evaluate('fn:distinct-values(("a", "b", "c"), "CollationA")'))
                .to.have.ordered.members(["a", "b", "c"]);
        });
    });

    describe("insert-before()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:insert-before(("a", "b", "c"), 0, "z")'))
                .to.have.ordered.members(["z", "a", "b", "c"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:insert-before(("a", "b", "c"), 1, "z")'))
                .to.have.ordered.members(["z", "a", "b", "c"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:insert-before(("a", "b", "c"), 2, "z")'))
                .to.have.ordered.members(["a", "z", "b", "c"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:insert-before(("a", "b", "c"), 3, "z")'))
                .to.have.ordered.members(["a", "b", "z", "c"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:insert-before(("a", "b", "c"), 4, "z")'))
                .to.have.ordered.members(["a", "b", "c", "z"]);
        });
    });

    describe("remove()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:remove(("a", "b", "c"), 0)'))
                .to.have.ordered.members(["a", "b", "c"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:remove(("a", "b", "c"), 1)'))
                .to.have.ordered.members(["b", "c"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:remove(("a", "b", "c"), 6)'))
                .to.have.ordered.members(["a", "b", "c"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:remove((), 3)'))
                .to.have.ordered.members([]);
        });
    });

    describe("reverse()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:reverse(("a", "b", "c"))'))
                .to.have.ordered.members(["c", "b", "a"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:reverse(("hello"))'))
                .to.have.ordered.members(["hello"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:reverse(())'))
                .to.have.ordered.members([]);
        });
    });

    describe("subsequence()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:subsequence(("a", "b", "c", "d", "e"), 4)'))
                .to.have.ordered.members(["d", "e"]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:subsequence(("a", "b", "c", "d", "e"), 3, 2)'))
                .to.have.ordered.members(["c", "d"]);
        });
    });

    // TODO: test unordered

    describe("zero-or-one()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:zero-or-one((1))'))
                .to.have.ordered.members([1]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:zero-or-one(())'))
                .to.have.ordered.members([]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('fn:zero-or-one((1, 2))')})
                .to.throw(xpath.classes.Exception, 'fn:zero-or-one called with a sequence containing more than one item.');
        });
    });

    describe("one-or-more()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:one-or-more((1))'))
                .to.have.ordered.members([1]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:one-or-more((1, 2))'))
                .to.have.ordered.members([1, 2]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('fn:one-or-more(())')})
                .to.throw(xpath.classes.Exception, 'fn:one-or-more called with a sequence containing no items.');
        });
    });

    describe("exactly-one()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:exactly-one((1))'))
                .to.have.ordered.members([1]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('fn:exactly-one((1, 2))')})
                .to.throw(xpath.classes.Exception, 'fn:exactly-one called with a sequence containing zero or more than one item.');
        });
        it('', function() {
            expect(function(){xpath.evaluate('fn:exactly-one(())')})
                .to.throw(xpath.classes.Exception, 'fn:exactly-one called with a sequence containing zero or more than one item.');
        });
    });

    // FIXME: deep-equal() Not implemented
    xdescribe("deep-equal()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:deep-equal((), ())'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:deep-equal(1, 1)'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:deep-equal(1, 2)'))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:deep-equal((1, 2, 3), (1, 2, 3))'))
                .to.have.ordered.members([true]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:deep-equal((1, 2, 3), (3, 2, 1))'))
                .to.have.ordered.members([false]);
        });
    });

    // FIXME: deep-equal() Not implemented
    xdescribe("deep-equal() with collation", function() {
        it('', function() {
            expect(xpath.evaluate('fn:deep-equal("Strasse", "Straße", "deutsch")'))
                .to.have.ordered.members([true]);
        });
    });

    describe("count()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:count((fn:true(), 2, "3"))'))
                .to.have.ordered.members([3]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:count(())'))
                .to.have.ordered.members([0]);
        });
    });

    describe("avg()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:avg((3, 4, 5))'))
                .to.have.ordered.members([4]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:avg((xs:yearMonthDuration("P20Y"), xs:yearMonthDuration("P10M"))))'))
                .to.have.ordered.members(['P10Y5M']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:avg(())'))
                .to.have.ordered.members([]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:avg((xs:float("INF"), xs:float("-INF"))))'))
                .to.have.ordered.members(['NaN']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:avg(((3, 4, 5), xs:float("NaN"))))'))
                .to.have.ordered.members(['NaN']);
        });
        it('', function() {
            expect(function(){xpath.evaluate('fn:avg((xs:yearMonthDuration("P20Y"), (3, 4, 5)))')})
                .to.throw(xpath.classes.Exception, '');
        });
    });

    describe("max()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:max((3,4,5))'))
                .to.have.ordered.members([5]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:max((5, 5.0e0))'))
                .to.have.ordered.members([5.0e0]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:max(("a", "b", "c"))')) // under a typical default collation.
                .to.have.ordered.members(["c"]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('fn:max((3,4,"Zero"))')})
                .to.throw(xpath.classes.Exception, '');
        });
    });

    describe("min()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:min((3,4,5))'))
                .to.have.ordered.members([3]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:min((5, 5.0e0))'))
                .to.have.ordered.members([5.0e0]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:min((xs:float(0.0E0), xs:float(-0.0E0)))'))
                .to.have.ordered.members([-0]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:min(("a", "b", "c"))'))   // under a typical default collation.
                .to.have.ordered.members(["a"]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('fn:min((3,4,"Zero"))')})
                .to.throw(xpath.classes.Exception, '');
        });
    });

    describe("sum()", function() {
        it('', function() {
            expect(xpath.evaluate('fn:string(fn:sum((xs:yearMonthDuration("P20Y"), xs:yearMonthDuration("P10M"))))'))
                .to.have.ordered.members(['P20Y10M']);
        });
        it('', function() {
            expect(xpath.evaluate('fn:sum((3, 4, 5))'))
                .to.have.ordered.members([12]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:min((xs:float(0.0E0), xs:float(-0.0E0)))'))
                .to.have.ordered.members([-0]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:sum(())'))
                .to.have.ordered.members([0]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:sum((),())'))
                .to.have.ordered.members([]);
        });
        it('', function() {
            expect(function(){xpath.evaluate('fn:sum((xs:yearMonthDuration("P20Y"), 9E1))')})
                .to.throw(xpath.classes.Exception, '');
        });
    });

    // TODO: Implement mock and check test
    xdescribe("id()", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:id("id") instance of element() element()', mockDocument))
                .to.have.ordered.members([false]);
        });
        it('', function() {
            expect(xpath.evaluate('fn:id("id_test") instance of element()', mockDocument))
                .to.have.ordered.members([true]);
        });
    });

    // TODO: Implement mock and check test
    xdescribe("idref()", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:idref("idref") instance of element()', mockDocument))
                .to.have.ordered.members([true]);
        });
    });

    // TODO: Implement doc() function and check test
    xdescribe("doc()", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:doc("doc.xml") instance of document()'))
                .to.have.ordered.members([true]);
        });
    });

    // TODO: Implement doc-available() function and check test
    xdescribe("doc-available()", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:doc-available("doc-available.xml")'))
                .to.have.ordered.members([true]);
        });
    });

    // TODO: Implement collection() function and check test
    xdescribe("collection()", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:collection("collection.xml") instance of document()'))
                .to.have.ordered.members([true]);
        });
    });

    // TODO: Implement collection() function and check test
    xdescribe("element-with-id()", function() {
        // Not W3C tests
        it('', function() {
            expect(xpath.evaluate('fn:element-with-id("element-with-id") instance of element()', mockDocument))
                .to.have.ordered.members([true]);
        });
    });
});