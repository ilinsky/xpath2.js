var nanodom = require('./nanodom');

var createDocument = nanodom.createDocument;
var createElement = nanodom.createElement;
var createComment = nanodom.createComment;
var createText = nanodom.createText;
var createAttribute = nanodom.createAttribute;
var createProcessingInstruction = nanodom.createProcessingInstruction;
var addAttribute = nanodom.addAttribute;
var addChild = nanodom.addChild;

//    <div id="test">
//        <div id="test_1">test_1</div>
//        <div>
//            <div id="test_2">test_2</div>
//        </div>
//        <div id="test_3">test_3</div>
//    </div>

var testDocument = createDocument();

var test = createElement('div');
addAttribute(test, createAttribute('id', 'test'));
addChild(testDocument, test);

testDocument.documentElement = test;
testDocument.getElementById = function(id) {
    if (id == "test")
        return test;
    if (id == "test_1")
        return test_1;
    if (id == "test_2")
        return test_2;
    if (id == "test_3")
        return test_3;
    return null;
};

var test_1 = createElement('div');
addAttribute(test_1, createAttribute('id', 'test_1'));
addChild(test_1, createText('test_1'));
addChild(test, test_1);

    var div = createElement('div');
    addChild(test_1, div);

        var test_2 = createElement('div');
        addAttribute(test_2, createAttribute('id', 'test_2'));
        addChild(test_2, createText('test_2'));
        addChild(div, test_2);

var test_3 = createElement('div');
addAttribute(test_3, createAttribute('id', 'test_3'));
addChild(test_3, createText('test_3'));
addChild(test, test_3);

module.exports = testDocument;