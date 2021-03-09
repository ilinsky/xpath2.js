// <test-element test-attribute="value" xml:lang="en" />

// Pseudo XML document
var testAttribute = {
    nodeType: 2,
    localName: 'test-attribute',
//    nodeName: 'test-attribute',
//    nodeValue: 'value',
    nodeValue: 'value'
};
var xmlLangAttribute = {
    nodeType: 2,
//    prefix: 'xml',
//    localName: 'lang',
    nodeName: 'xml:lang',
    nodeValue: 'en'
};
var testElement = {
    nodeType: 1,
    localName: 'test-element',
    nodeName: 'test-element',
//    namespaceURI: 'http://www.w3.org/1999/xhtml',
    attributes: [testAttribute, xmlLangAttribute]
};
testAttribute.ownerElement = testElement;
xmlLangAttribute.ownerElement = testElement;
var doc = {
    nodeType: 9,
    nodeName: '#document',
    namespaceURI: null,
    documentElement: testElement,
    firstChild: testElement,
    lastChild: testElement
};
testElement.parentNode = doc;

module.exports = doc;