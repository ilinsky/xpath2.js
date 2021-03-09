// <test-element test-attribute="value" xml:lang="en" id="id_test" />

// Pseudo XML document
var testAttribute = {
    nodeType: 2,
    localName: 'test-attribute',
//    nodeName: 'test-attribute',
    nodeValue: 'value'
};
var idAttribute = {
    nodeType: 2,
    localName: 'id',
//    nodeName: 'id',
    nodeValue: 'id_test'
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
    attributes: [testAttribute, xmlLangAttribute, idAttribute]
};
testAttribute.ownerElement = testElement;
xmlLangAttribute.ownerElement = testElement;
var doc = {
    nodeType: 9,
    nodeName: '#document',
    namespaceURI: null,
    documentElement: testElement,
    firstChild: testElement,
    lastChild: testElement,
    getElementById: function(id) {
        if (id == "id_test")
            return testElement;
        return null;
    }
};
testElement.parentNode = doc;

module.exports = doc;