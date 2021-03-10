var nanodom = require('./nanodom');

var createDocument = nanodom.createDocument;
var createElement = nanodom.createElement;
var createComment = nanodom.createComment;
var createText = nanodom.createText;
var createAttribute = nanodom.createAttribute;
var createProcessingInstruction = nanodom.createProcessingInstruction;
var addAttribute = nanodom.addAttribute;
var addChild = nanodom.addChild;

// <test-element test-attribute="value" xml:lang="en" id="id_test" />

var testDocument = createDocument();
var testElement = createElement('test-element');
addChild(testDocument, testElement);
addAttribute(testElement, createAttribute('test-attribute', 'value'));
addAttribute(testElement, createAttribute('xml:lang', 'en'));
addAttribute(testElement, createAttribute('id', 'id_test'));

module.exports = testDocument;