var nanodom = require('./nanodom');

var createDocument = nanodom.createDocument;
var createElement = nanodom.createElement;
var createComment = nanodom.createComment;
var createText = nanodom.createText;
var createAttribute = nanodom.createAttribute;
var createProcessingInstruction = nanodom.createProcessingInstruction;
var addAttribute = nanodom.addAttribute;
var addChild = nanodom.addChild;

//<?pi-target pi-value?>
//<?pi-target2 pi-value2?>
//<html>
//	<body>
//		<div id="_root_before"></div>
//		<div id="_root">
//			<div id="_ele0">
//				<div id="_ele01">1</div>
//				<div id="_ele02">2</div>
//			</div>
//			<div id="_ele1">
//				<div id="_ele11"></div>
//				<div id="_ele12">
//					<div id="_ele121"></div>
//					<div id="_ele122"></div>
//				</div>
//				<div id="_ele13"></div>
//			</div>
//			<div id="_ele2">
//				<div id="_ele21"></div>
//				<blockquote id="_ele22">
//					<div id="_ele221"><!--Comment-->Text</div>
//				</blockquote>
//				<div id="_ele23"></div>
//			</div>
//		</div>
//		<div id="_root_after"></div>
//	</body>
//</html>

var testDocument = createDocument();
addChild(testDocument, createProcessingInstruction('pi-target', 'pi-value'));
addChild(testDocument, createProcessingInstruction('pi-target2', 'pi-value2'));
var html = createElement('html');
addAttribute(html, createAttribute('dec', '10.10'));
addAttribute(html, createAttribute('int', '10'));
addAttribute(html, createAttribute('boo', 'true'));
addChild(testDocument, html);
testDocument.documentElement = html;

    var body = createElement('body');
    addChild(html, body);

        var _root_before = createElement('div');
        addAttribute(_root_before, createAttribute('id', '_root_before'));
        addChild(body, _root_before);

        var _root = createElement('div');
        addAttribute(_root, createAttribute('id', '_root'));
        addChild(body, _root);

            var _ele0 = createElement('div');
            addAttribute(_ele0, createAttribute('id', '_ele0'));
            addChild(_root, _ele0);

                var _ele01 = createElement('div');
                addAttribute(_ele01, createAttribute('id', '_ele01'));
                addChild(_ele0, _ele01);

                    var _ele01Text = createText('1');
                    addChild(_ele01, _ele01Text);

                var _ele02 = createElement('div');
                addAttribute(_ele02, createAttribute('id', '_ele02'));
                addChild(_ele0, _ele02);

                    var _ele02Text = createText('2');
                    addChild(_ele02, _ele02Text);

            var _ele1 = createElement('div');
            addAttribute(_ele1, createAttribute('id', '_ele1'));
            addChild(_root, _ele1);

                var _ele11 = createElement('div');
                addAttribute(_ele11, createAttribute('id', '_ele11'));
                addChild(_ele1, _ele11);

                var _ele12 = createElement('div');
                addAttribute(_ele12, createAttribute('id', '_ele12'));
                addChild(_ele1, _ele12);

                    var _ele121 = createElement('div');
                    addAttribute(_ele121, createAttribute('id', '_ele121'));
                    addChild(_ele12, _ele121);

                    var _ele122 = createElement('div');
                    addAttribute(_ele122, createAttribute('id', '_ele122'));
                    addChild(_ele12, _ele122);

                var _ele13 = createElement('div');
                addAttribute(_ele13, createAttribute('id', '_ele13'));
                addChild(_ele1, _ele13);

            var _ele2 = createElement('div');
            addAttribute(_ele2, createAttribute('id', '_ele2'));
            addChild(_root, _ele2);

                    var _ele21 = createElement('div');
                    addAttribute(_ele21, createAttribute('id', '_ele21'));
                    addChild(_ele2, _ele21);

                    var _ele22 = createElement('blockquote');
                    addAttribute(_ele22, createAttribute('id', '_ele22'));
                    addChild(_ele2, _ele22);

                        var _ele221 = createElement('div');
                        addAttribute(_root, createAttribute('id', '_ele221'));
                        addChild(_ele22, _ele221);

                            var _ele221Comment = createComment('Comment');
                            addChild(_ele221, _ele221Comment);

                            var _ele221Text = createText('Text');
                            addChild(_ele221, _ele221Text);

                    var _ele23 = createElement('div');
                    addAttribute(_ele23, createAttribute('id', '_ele23'));
                    addChild(_ele2, _ele23);

        var _root_after = createElement('div');
        addAttribute(_root_after, createAttribute('id', '_root_after'));
        addChild(body, _root_after);

testDocument.getElementById = function(id) {
    if (id == "_root_before")
        return _root_before;
    if (id == "_root")
        return _root;
    if (id == "_ele0")
        return _ele0;
    if (id == "_ele01")
        return _ele01;
    if (id == "_ele02")
        return _ele02;
    if (id == "_ele1")
        return _ele1;
    if (id == "_ele11")
        return _ele11;
    if (id == "_ele12")
        return _ele12;
    if (id == "_ele121")
        return _ele121;
    if (id == "_ele122")
        return _ele122;
    if (id == "_ele13")
        return _ele13;
    if (id == "_ele2")
        return _ele2;
    if (id == "_ele21")
        return _ele21;
    if (id == "_ele22")
        return _ele22;
    if (id == "_ele221")
        return _ele221;
    if (id == "_ele23")
        return _ele23;
    if (id == "_root_after")
        return _root_after;
    return null;
};

module.exports = testDocument;