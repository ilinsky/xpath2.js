var xpath = require('./../../lib');
var expect = require('chai').expect;

var mockDocument = require('./../mockFullDocument');

describe("path", function() {
    describe("kind test", function() {
        describe("node()", function() {
            it('', function() {
                expect(xpath.evaluate('node()', mockDocument))
                    .to.have.ordered.members([mockDocument.childNodes[0], mockDocument.childNodes[1], mockDocument.childNodes[2]]);
            });
        });

        describe("document-node()", function() {
            it('', function() {
                expect(xpath.evaluate('self::document-node()', mockDocument))
                    .to.have.ordered.members([mockDocument]);
            });
        });

        describe("element()", function() {
            it('', function() {
                expect(xpath.evaluate('element()', mockDocument))
                    .to.have.ordered.members([mockDocument.documentElement]);
            });
        });

        describe("attribute()", function() {
            it('', function() {
                expect(xpath.evaluate('attribute()', mockDocument.documentElement))
                    .to.have.ordered.members([mockDocument.documentElement.attributes[0], mockDocument.documentElement.attributes[1], mockDocument.documentElement.attributes[2]]);
            });
        });

        describe("processing-instruction()", function() {
            it('', function() {
                expect(xpath.evaluate('processing-instruction()', mockDocument))
                    .to.have.ordered.members([mockDocument.firstChild, mockDocument.firstChild.nextSibling]);
            });

            it('', function() {
                expect(xpath.evaluate('processing-instruction("pi-target")', mockDocument))
                    .to.have.ordered.members([mockDocument.firstChild]);
                expect(xpath.evaluate('fn:string(processing-instruction("pi-target"))', mockDocument))
                    .to.have.ordered.members(["pi-value"]);
            });
        });

        describe("comment()", function() {
            it('', function() {
                var context = mockDocument.getElementById("_ele221");
                expect(xpath.evaluate('comment()', context))
                    .to.have.ordered.members([context.firstChild]);
                expect(xpath.evaluate('fn:string(comment())', context))
                    .to.have.ordered.members(["Comment"]);
            });
        });

        describe("text()", function() {
            it('', function() {
                var context = mockDocument.getElementById("_ele221");
                expect(xpath.evaluate('text()', context))
                    .to.have.ordered.members([context.lastChild]);
                expect(xpath.evaluate('fn:string(text())', context))
                    .to.have.ordered.members(["Text"]);
            });
        });

        // TODO: Implement tests for schema-attribute()
        // TODO: Implement tests for schema-element()
    });

    describe("element name test", function() {
        describe("*", function() {
            it('', function() {
                var context	= mockDocument.getElementById("_ele2"),
                    ele21	= mockDocument.getElementById("_ele21"),
                    ele22	= mockDocument.getElementById("_ele22"),
                    ele23	= mockDocument.getElementById("_ele23");

                expect(xpath.evaluate('*', context))
                    .to.have.ordered.members([ele21, ele22, ele23]);
            });
        });

        describe("specific name", function() {
            it('', function() {
                var context	= mockDocument.getElementById("_ele2"),
                    ele21	= mockDocument.getElementById("_ele21"),
                    ele23	= mockDocument.getElementById("_ele23");

                expect(xpath.evaluate('div', context))
                    .to.have.ordered.members([ele21, ele23]);
            });
        });

        // TODO: Implement tests *:name, prefix:*, *:*
    });

    describe("attribute name test", function() {
        describe("*", function() {
            it('', function() {
                var context	= mockDocument.documentElement;

                expect(xpath.evaluate('attribute::*', context))
                    .to.have.ordered.members([context.attributes[0], context.attributes[1], context.attributes[2]]);
            });
        });

        describe("specific name", function() {
            it('', function() {
                var context	= mockDocument.documentElement;

                expect(xpath.evaluate('attribute::boo', context))
                    .to.have.ordered.members([context.attributes[2]]);
            });
        });

        // TODO: Implement tests *:name, prefix:*, *:*
    });

    describe("/", function() {
        it('', function() {
            expect(xpath.evaluate('/', mockDocument))
                .to.have.ordered.members([mockDocument]);
        });
        it('', function() {
            expect(xpath.evaluate('/*', mockDocument.documentElement))
                .to.have.ordered.members([mockDocument.documentElement]);
        });
        // TODO: Implement test
        xit('', function() {
            expect(xpath.evaluate('//*', mockDocument))
                .to.have.ordered.members([]);
        });
    });

    describe("axis", function() {
        describe("attribute", function() {
            it('', function() {
                var context = mockDocument.documentElement;
                expect(xpath.evaluate('attribute::boo', context))
                    .to.have.ordered.members([context.attributes[2]]);
            });
        });

        describe("@", function() {
            it('', function() {
                var context = mockDocument.documentElement;
                expect(xpath.evaluate('@boo', context))
                    .to.have.ordered.members([context.attributes[2]]);
            });
        });

        describe("child", function() {
            it('', function() {
				var context	= mockDocument.getElementById("_ele2"),
					ele21	= mockDocument.getElementById("_ele21"),
					ele23	= mockDocument.getElementById("_ele23");

                expect(xpath.evaluate('child::div', context))
                    .to.have.ordered.members([ele21, ele23]);
            });
        });

        describe("descendant", function() {
            it('', function() {
                var context	= mockDocument.getElementById("_ele2"),
                    ele21	= mockDocument.getElementById("_ele21"),
                    ele221	= mockDocument.getElementById("_ele221"),
                    ele23	= mockDocument.getElementById("_ele23");

                expect(xpath.evaluate('descendant::div', context))
                    .to.have.ordered.members([ele21, ele221, ele23]);
            });
        });

        describe("descendant-or-self", function() {
            it('', function() {
                var context	= mockDocument.getElementById("_ele2"),
                    ele21	= mockDocument.getElementById("_ele21"),
                    ele221	= mockDocument.getElementById("_ele221"),
                    ele23	= mockDocument.getElementById("_ele23");

                expect(xpath.evaluate('descendant-or-self::div', context))
                    .to.have.ordered.members([context, ele21, ele221, ele23]);
            });
        });

        describe("following", function() {
            it('', function() {
				var context	= mockDocument.getElementById("_ele12"),
					ele13	= mockDocument.getElementById("_ele13"),
					ele2	= mockDocument.getElementById("_ele2"),
					ele21	= mockDocument.getElementById("_ele21"),
					ele221	= mockDocument.getElementById("_ele221"),
					ele23	= mockDocument.getElementById("_ele23"),
					root_after	= mockDocument.getElementById("_root_after");

                expect(xpath.evaluate('following::div', context))
                    .to.have.ordered.members([ele13, ele2, ele21, ele221, ele23, root_after]);
            });
        });

        describe("following-sibling", function() {
            it('', function() {
				var context	= mockDocument.getElementById("_ele0"),
					ele1	= mockDocument.getElementById("_ele1"),
					ele2	= mockDocument.getElementById("_ele2");

                expect(xpath.evaluate('following-sibling::div', context))
                    .to.have.ordered.members([ele1, ele2]);
            });
        });

        describe("self", function() {
            it('', function() {
				var context	= mockDocument.getElementById("_ele2");

                expect(xpath.evaluate('self::node()', context))
                    .to.have.ordered.members([context]);
            });
        });

        // Revers
        describe("ancestor", function() {
            it('', function() {
				var context	= mockDocument.getElementById("_ele2"),
				    body    = mockDocument.documentElement.firstChild,
					root	= mockDocument.getElementById("_root");

                expect(xpath.evaluate('ancestor::*', context))
                    .to.have.ordered.members([mockDocument.documentElement, body, root]);
            });
        });

        describe("ancestor", function() {
            it('', function() {
				var context	= mockDocument.getElementById("_ele2"),
				    body    = mockDocument.documentElement.firstChild,
					root	= mockDocument.getElementById("_root");

                expect(xpath.evaluate('ancestor-or-self::*', context))
                    .to.have.ordered.members([mockDocument.documentElement, body, root, context]);
            });
        });

        describe("parent", function() {
            it('', function() {
				var context	= mockDocument.getElementById("_ele2"),
					root	= mockDocument.getElementById("_root");

                expect(xpath.evaluate('parent::*', context))
                    .to.have.ordered.members([root]);
            });
        });

        describe("..", function() {
            it('', function() {
				var context	= mockDocument.getElementById("_ele2"),
					root	= mockDocument.getElementById("_root");

                expect(xpath.evaluate('..', context))
                    .to.have.ordered.members([root]);
            });
        });

        describe("preceding", function() {
            it('', function() {
				var context	= mockDocument.getElementById("_ele12"),
					root_before	= mockDocument.getElementById("_root_before"),
					ele0	= mockDocument.getElementById("_ele0"),
					ele01	= mockDocument.getElementById("_ele01"),
					ele02	= mockDocument.getElementById("_ele02"),
					ele11	= mockDocument.getElementById("_ele11");

                expect(xpath.evaluate('preceding::div', context))
                    .to.have.ordered.members([root_before, ele0, ele01, ele02, ele11]);
            });
        });

        describe("preceding", function() {
            it('', function() {
				var context	= mockDocument.getElementById("_ele2"),
					ele0	= mockDocument.getElementById("_ele0"),
					ele1	= mockDocument.getElementById("_ele1");

                expect(xpath.evaluate('preceding-sibling::div', context))
                    .to.have.ordered.members([ele0, ele1]);
            });
        });
    });
});