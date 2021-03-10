var xpath = require('./../../api/xpath');
var expect = require('chai').expect;

var document = require('./../pathTestDocument');

describe("path", function() {
    describe("kind test", function() {
        describe("node()", function() {
            it('', function() {
                expect(xpath.evaluate('node()', document))
                    .to.have.ordered.members([document.childNodes[0], document.childNodes[1], document.childNodes[2]]);
            });
        });

        describe("document-node()", function() {
            it('', function() {
                expect(xpath.evaluate('self::document-node()', document))
                    .to.have.ordered.members([document]);
            });
        });

        describe("element()", function() {
            it('', function() {
                expect(xpath.evaluate('element()', document))
                    .to.have.ordered.members([document.documentElement]);
            });
        });

        describe("attribute()", function() {
            it('', function() {
                expect(xpath.evaluate('attribute()', document.documentElement))
                    .to.have.ordered.members([document.documentElement.attributes[0], document.documentElement.attributes[1], document.documentElement.attributes[2]]);
            });
        });

        describe("processing-instruction()", function() {
            it('', function() {
                expect(xpath.evaluate('processing-instruction()', document))
                    .to.have.ordered.members([document.firstChild, document.firstChild.nextSibling]);
            });

            it('', function() {
                expect(xpath.evaluate('processing-instruction("pi-target")', document))
                    .to.have.ordered.members([document.firstChild]);
            });
        });

        describe("comment()", function() {
            it('', function() {
                var context = document.getElementById("_ele221");
                expect(xpath.evaluate('comment()', context))
                    .to.have.ordered.members([context.firstChild]);
            });
        });

        describe("text()", function() {
            it('', function() {
                var context = document.getElementById("_ele221");
                expect(xpath.evaluate('text()', context))
                    .to.have.ordered.members([context.lastChild]);
            });
        });

        // TODO: Implement tests for schema-attribute()
        // TODO: Implement tests for schema-element()
    });

    describe("element name test", function() {
        describe("*", function() {
            it('', function() {
                var context	= document.getElementById("_ele2"),
                    ele21	= document.getElementById("_ele21"),
                    ele22	= document.getElementById("_ele22"),
                    ele23	= document.getElementById("_ele23");

                expect(xpath.evaluate('*', context))
                    .to.have.ordered.members([ele21, ele22, ele23]);
            });
        });

        describe("specific name", function() {
            it('', function() {
                var context	= document.getElementById("_ele2"),
                    ele21	= document.getElementById("_ele21"),
                    ele23	= document.getElementById("_ele23");

                expect(xpath.evaluate('div', context))
                    .to.have.ordered.members([ele21, ele23]);
            });
        });

        // TODO: Implement tests *:name, prefix:*, *:*
    });

    describe("attribute name test", function() {
        describe("*", function() {
            it('', function() {
                var context	= document.documentElement;

                expect(xpath.evaluate('attribute::*', context))
                    .to.have.ordered.members([context.attributes[0], context.attributes[1], context.attributes[2]]);
            });
        });

        describe("specific name", function() {
            it('', function() {
                var context	= document.documentElement;

                expect(xpath.evaluate('attribute::boo', context))
                    .to.have.ordered.members([context.attributes[2]]);
            });
        });

        // TODO: Implement tests *:name, prefix:*, *:*
    });

    describe("/", function() {
        it('', function() {
            expect(xpath.evaluate('/', document))
                .to.have.ordered.members([document]);
        });
        it('', function() {
            expect(xpath.evaluate('/*', document.documentElement))
                .to.have.ordered.members([document.documentElement]);
        });
        // TODO: Implement test
        xit('', function() {
            expect(xpath.evaluate('//*', document))
                .to.have.ordered.members([]);
        });
    });

    describe("axis", function() {
        describe("attribute", function() {
            it('', function() {
                var context = document.documentElement;
                expect(xpath.evaluate('attribute::boo', context))
                    .to.have.ordered.members([context.attributes[2]]);
            });
        });

        describe("@", function() {
            it('', function() {
                var context = document.documentElement;
                expect(xpath.evaluate('@boo', context))
                    .to.have.ordered.members([context.attributes[2]]);
            });
        });

        describe("child", function() {
            it('', function() {
				var context	= document.getElementById("_ele2"),
					ele21	= document.getElementById("_ele21"),
					ele23	= document.getElementById("_ele23");

                expect(xpath.evaluate('child::div', context))
                    .to.have.ordered.members([ele21, ele23]);
            });
        });

        describe("descendant", function() {
            it('', function() {
                var context	= document.getElementById("_ele2"),
                    ele21	= document.getElementById("_ele21"),
                    ele221	= document.getElementById("_ele221"),
                    ele23	= document.getElementById("_ele23");

                expect(xpath.evaluate('descendant::div', context))
                    .to.have.ordered.members([ele21, ele221, ele23]);
            });
        });

        describe("descendant-or-self", function() {
            it('', function() {
                var context	= document.getElementById("_ele2"),
                    ele21	= document.getElementById("_ele21"),
                    ele221	= document.getElementById("_ele221"),
                    ele23	= document.getElementById("_ele23");

                expect(xpath.evaluate('descendant-or-self::div', context))
                    .to.have.ordered.members([context, ele21, ele221, ele23]);
            });
        });

        describe("following", function() {
            it('', function() {
				var context	= document.getElementById("_ele12"),
					ele13	= document.getElementById("_ele13"),
					ele2	= document.getElementById("_ele2"),
					ele21	= document.getElementById("_ele21"),
					ele221	= document.getElementById("_ele221"),
					ele23	= document.getElementById("_ele23"),
					root_after	= document.getElementById("_root_after");

                expect(xpath.evaluate('following::div', context))
                    .to.have.ordered.members([ele13, ele2, ele21, ele221, ele23, root_after]);
            });
        });

        describe("following-sibling", function() {
            it('', function() {
				var context	= document.getElementById("_ele0"),
					ele1	= document.getElementById("_ele1"),
					ele2	= document.getElementById("_ele2");

                expect(xpath.evaluate('following-sibling::div', context))
                    .to.have.ordered.members([ele1, ele2]);
            });
        });

        describe("self", function() {
            it('', function() {
				var context	= document.getElementById("_ele2");

                expect(xpath.evaluate('self::node()', context))
                    .to.have.ordered.members([context]);
            });
        });

        // Revers
        describe("ancestor", function() {
            it('', function() {
				var context	= document.getElementById("_ele2"),
				    body    = document.documentElement.firstChild,
					root	= document.getElementById("_root");

                expect(xpath.evaluate('ancestor::*', context))
                    .to.have.ordered.members([document.documentElement, body, root]);
            });
        });

        describe("ancestor", function() {
            it('', function() {
				var context	= document.getElementById("_ele2"),
				    body    = document.documentElement.firstChild,
					root	= document.getElementById("_root");

                expect(xpath.evaluate('ancestor-or-self::*', context))
                    .to.have.ordered.members([document.documentElement, body, root, context]);
            });
        });

        describe("parent", function() {
            it('', function() {
				var context	= document.getElementById("_ele2"),
					root	= document.getElementById("_root");

                expect(xpath.evaluate('parent::*', context))
                    .to.have.ordered.members([root]);
            });
        });

        describe("..", function() {
            it('', function() {
				var context	= document.getElementById("_ele2"),
					root	= document.getElementById("_root");

                expect(xpath.evaluate('..', context))
                    .to.have.ordered.members([root]);
            });
        });

        describe("preceding", function() {
            it('', function() {
				var context	= document.getElementById("_ele12"),
					root_before	= document.getElementById("_root_before"),
					ele0	= document.getElementById("_ele0"),
					ele01	= document.getElementById("_ele01"),
					ele02	= document.getElementById("_ele02"),
					ele11	= document.getElementById("_ele11");

                expect(xpath.evaluate('preceding::div', context))
                    .to.have.ordered.members([root_before, ele0, ele01, ele02, ele11]);
            });
        });

        describe("preceding", function() {
            it('', function() {
				var context	= document.getElementById("_ele2"),
					ele0	= document.getElementById("_ele0"),
					ele1	= document.getElementById("_ele1");

                expect(xpath.evaluate('preceding-sibling::div', context))
                    .to.have.ordered.members([ele0, ele1]);
            });
        });
    });
});